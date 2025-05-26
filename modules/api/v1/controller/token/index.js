import jwt from 'jsonwebtoken'
import {generateAccessToken} from './generateAccessToken.js'
import {findRefreshTokenByTokenId} from './findRefreshTokenByTokenId.js'

export const getNewAccessToken = async (req, res) => {
  const tokenInURL = req.query.token
  try {
    const refreshTokenInDb = await findRefreshTokenByTokenId(tokenInURL)
    console.log(refreshTokenInDb)
    if (refreshTokenInDb.success) {
      jwt.verify(
        refreshTokenInDb.refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (error, _user) => {
          if (error) return res.status(403).json('you are not signed in')
            // should remove that expired refresh token here.
          try {
            const accessToken = generateAccessToken(refreshTokenInDb.tokenId)
            res.json({token: accessToken})
          } catch (err) {
            console.log(err)
            res.json('could not create a new access token')
          }
        },
      )
    } else {
      res.status(401).json(refreshTokenInDb.msg)
    }
  } catch (err) {
    res.status(404).json('token did not found')
  }
}
