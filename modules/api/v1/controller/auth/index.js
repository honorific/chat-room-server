import Token from '../../models/Token.js'
import User from '../../models/User.js'
import jwt from 'jsonwebtoken'
import {generateAccessToken} from '../token/generateAccessToken.js'

export const register = async (req, res) => {
  try {
    const refreshToken = jwt.sign(
      {username: req.body.username},
      process.env.REFRESH_TOKEN_SECRET,
    )
    const newRefreshToken = new Token({
      refreshToken,
    })
    const refreshTokenInDb = await newRefreshToken.save()
    const accessToken = generateAccessToken(refreshTokenInDb)
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
  if (req.refToken) {
    try {
      await Token.deleteOne({refreshToken: req.refToken})
      try {
        const user = await User.deleteOne({username: req.query.username})
        res.status(200).json(user)
      } catch (err) {
        console.log(err)
        res.status(403).json("don't have right to delete")
      }
    } catch (err) {
      console.log(err)
      res.status(400).json('could not delete user token')
    }
  } else {
    res.status(404).json('user token not founded')
  }
}
