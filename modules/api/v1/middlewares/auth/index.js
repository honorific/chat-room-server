import jwt from 'jsonwebtoken'
import {generateAccessToken} from '../../controller/token/generateAccessToken.js'
import getTokenInRequest from '../../controller/token/getTokenInRequest.js'
import {findRefreshTokenByTokenId} from '../../controller/token/findRefreshTokenByTokenId.js'

export const verifyAccessToken = (skipOnfailure = false) => {
  return async (req, res, next) => {
    const tokenInReq = getTokenInRequest(req.headers.authorization)
    console.log('tokenInReq is: ', tokenInReq)
    const {tokenId} = jwt.decode(tokenInReq)

    try {
      const refreshTokenInDb = await findRefreshTokenByTokenId(tokenInReq)
      console.log('refreshTokenInDB is: ', refreshTokenInDb)
      if (refreshTokenInDb.success) {
        jwt.verify(
          refreshTokenInDb.refreshToken,
          process.env.REFRESH_TOKEN_SECRET,
          (refreshTokenError, _verified) => {
            if (refreshTokenError) {
              res.status(401).json('unAuthorized in refreshToken')
            } else {
              jwt.verify(
                tokenInReq,
                process.env.ACCESS_TOKEN_SECRET,
                (accessTokenError, _verified) => {
                  if (accessTokenError) {
                    try {
                      generateAccessToken(tokenId)
                      next()
                    } catch (err) {
                      console.log(err)
                      res.status(500).json('error while creating token')
                    }
                  } else {
                    next()
                  }
                },
              )
            }
          },
        )
      } else {
        // in case of page refresh and leave and register the user,
        // if couldnt recognize user credentials,
        // just return and dont do the leave() controller
        if (!skipOnfailure) {
          res.status(500).json(refreshTokenInDb.msg)
        } else {
          return
        }
      }
    } catch (error) {
      console.log(error)
      res.status(500).json('error while retrieving refresh token')
    }
  }
}
