import jwt from 'jsonwebtoken'
import {generateAccessToken} from '../../controller/token/generateAccessToken.js'

export const verifyAccessToken = async (req, res, next) => {
  const tokenInRequest = req.body.token ?? req.query.token
  const {
    token: {refreshToken},
  } = jwt.decode(tokenInRequest)
  console.log('token is in verifyAccessToken: ', tokenInRequest)
  if (refreshToken) {
    jwt.verify(
      tokenInRequest,
      process.env.ACCESS_TOKEN_SECRET,
      (error, _verified) => {
        if (error) {
          try {
            generateAccessToken(refreshToken)
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
  } else {
    res.status(401).json('unauthorized in middleware')
  }
}

export const getRefreshTokenFromAccessToken = (req, res, next) => {
  const tokenInURL = req.query.token
  try {
    const {
      token: {refreshToken},
    } = jwt.decode(tokenInURL)
    if (!refreshToken) {
      res.status(500).json('could not leave the unknown user')
    } else {
      req.refToken = refreshToken
      console.log('refToken is: ', req.refToken)
      next()
    }
  } catch (err) {
    console.log(err)
    res.status(500).json('could not leave the unknown user')
  }
}
