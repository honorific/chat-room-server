import jwt from 'jsonwebtoken'
import {generateAccessToken} from '../../controller/token/generateAccessToken.js'

export const verifyAccessToken = async (req, res, next) => {
  const authHeader = req.headers.Authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({error: 'Unauthorized: No token provided'})
  }
  const tokenInReq = authHeader.split(' ')[1]
  const {
    token: {refreshToken},
  } = jwt.decode(tokenInReq)
  console.log('token is in verifyAccessToken: ', authHeader)
  if (refreshToken) {
    jwt.verify(
      tokenInReq,
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
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({error: 'Unauthorized: No token provided'})
  }
  const tokenInReq = authHeader.split(' ')[1]
  try {
    const {
      token: {refreshToken},
    } = jwt.decode(tokenInReq)
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
