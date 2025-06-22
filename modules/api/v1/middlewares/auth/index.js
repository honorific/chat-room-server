import jwt from 'jsonwebtoken'
import {generateAccessToken} from '../../controller/token/generateAccessToken.js'
import getTokenInRequest from '../../controller/token/getTokenInRequest.js'
import {findRefreshTokenByTokenId} from '../../controller/token/findRefreshTokenByTokenId.js'

export const verifyAccessToken = async (req, res, next) => {
  const tokenInReq = getTokenInRequest(req.headers.authorization)
  const {
    token: {tokenId},
  } = jwt.decode(tokenInReq)
  try {
    const refreshTokenInDb = await findRefreshTokenByTokenId(tokenInReq)
    console.log(refreshTokenInDb)
    if (refreshTokenInDb.success) {
      jwt.verify(
        refreshTokenInDb,
        process.env.REFRESH_TOKEN_SECRET,
        (refreshTokenError, _verified) => {
          if (refreshTokenError) {
            res.status(401).json('unAuthorized')
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
      res.status(500).json(refreshTokenInDb.msg)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json('error while retrieving refresh token')
  }
}

