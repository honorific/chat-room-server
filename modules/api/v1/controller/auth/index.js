import User from '../../models/User.js'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      gender: req.body.gender,
    })

    const user = await newUser.save()
    const refreshToken = jwt.sign(
      {username: user.username},
      process.env.REFRESH_TOKEN_SECRET,
    )
    const accessToken = jwt.sign(
      {token: refreshToken},
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: '15s'},
    )
    res.status(201).json({
      username: user.username,
      gender: user.gender,
      token: accessToken,
    })
  } catch (err) {
    console.log(err)
    res.status(401).json('unAuthorized')
  }
}

export const leave = async (req, res) => {
  try {
    const user = await User.deleteOne({username: req.query.username})
    res.status(200).json(user)
  } catch (err) {
    console.log(err)
    res.status(403).json("don't have right to delete")
  }
}
