import mongoose from 'mongoose'
import User from '../../models/User.js'

export const register = async (req, res) => {
  try {
    const newUser = mongoose.model('User_' + String(Date.now()), User)

    // new User({
    //   username: req.body.username,
    // })
    const final = new newUser({username: req.body.username})

    const user = await final.save()
    res.status(201).json(user)
  } catch (err) {
    console.log(err)
    res.status(401).json('unAuthorized')
  }
}
