import User from '../../models/User.js'

export const register = async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      gender: req.body.gender,
    })

    const user = await newUser.save()
    res.status(201).json({username: user.username, gender: user.gender})
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


