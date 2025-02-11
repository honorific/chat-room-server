import jwt from 'jsonwebtoken'
import Token from '../../models/Token.js'
import {generateAccessToken} from './generateAccessToken.js'

export const getNewAccessToken = async (req, res) => {
  const tokenInURL = req.query.token
  try {
    const {
      token: {refreshToken},
    } = jwt.decode(tokenInURL)

    const refreshTokenInDb = await Token.findOne({refreshToken})
    console.log(refreshTokenInDb)
    if (refreshTokenInDb) {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (error, _user) => {
          if (error) return res.status(403).json('you are not signed in')
          try {
            const accessToken = generateAccessToken(refreshToken)
            res.json({token: accessToken})
          } catch (err) {
            console.log(err)
            res.json('could not create a new access token')
          }
        },
      )
    } else {
      res.status(401).json('unAuthoried')
    }
  } catch (err) {
    res.status(404).json('token did not found')
  }
}
