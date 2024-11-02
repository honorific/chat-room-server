import User from '../../models/User.js'

export const register = async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
    })

    const user = await newUser.save()
    res.status(201).json(user)
  } catch (err) {
    console.log(err)
    res.status(401).json('unAuthorized')
  }
}
