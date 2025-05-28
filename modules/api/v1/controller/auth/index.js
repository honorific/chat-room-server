import Token from '../../models/Token.js'
import User from '../../models/User.js'
import jwt from 'jsonwebtoken'
import {generateAccessToken} from '../token/generateAccessToken.js'
import {v4 as uuidv4} from 'uuid'
import {findRefreshTokenByTokenId} from '../token/findRefreshTokenByTokenId.js'
import getTokenInRequest from '../token/getTokenInRequest.js'

export const register = async (req, res) => {
  const tokenId = uuidv4()
  try {
    const refreshToken = jwt.sign(
      {username: req.body.username},
      process.env.REFRESH_TOKEN_SECRET,
    )
    const newRefreshToken = new Token({
      refreshToken,
      tokenId,
    })
    const refreshTokenInDb = await newRefreshToken.save()
    const accessToken = generateAccessToken(tokenId)
    try {
      const newUser = new User({
        username: req.body.username,
        gender: req.body.gender,
      })

      const user = await newUser.save()
      res.status(201).json({
        username: user.username,
        gender: user.gender,
        token: accessToken,
      })
    } catch (err) {
      console.log(err)
      res.status(401).json('unAuthorized')
    }
  } catch (err) {
    console.log(err)
    res.status(500).json('failed to create token for user')
  }
}

export const leave = async (req, res) => {
  const tokenInReq = getTokenInRequest(req.headers.authorization)
  try {
    const refreshTokenInDb = await findRefreshTokenByTokenId(tokenInReq)
    console.log(refreshTokenInDb)
    if (refreshTokenInDb.success) {
      try {
        await Token.deleteOne({refreshToken: refreshTokenInDb.refreshToken})
        try {
          const user = await User.deleteOne({
            username: req.query.username,
          })
          res.status(200).json(user)
        } catch (err) {
          console.log(err)
          res.status(403).json("don't have right to delete user")
        }
      } catch (err) {
        console.log(err)
        res.status(400).json('could not delete user token')
      }
    } else {
      res.status(500).json(refreshTokenInDb.msg)
    }
  } catch (err) {
    console.log(err)
    res.status(500).json('could not leave the unknown user')
  }
}
