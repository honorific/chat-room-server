import User from '../../models/User.js'

export const exist = async (req, res) => {
  try {
    const user = await User.findOne({username: req.query.username})
    if (user) {
      res.status(200).json(true)
    } else {
      // cant send 404 error because it will log in console in frontEnd
      res.status(200).json(false)
    }
  } catch (err) {
    console.log(err)
    res.status(500).json('internal server error')
  }
}
