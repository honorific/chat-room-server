import User from '../../models/User.js'

export const exist = async (req, res) => {
  try {
    const user = await User.findOne({username: req.query.username})
    if (user) {
      res.status(200).json(true)
    } else {
      res.status(404).json(false)
    }
  } catch (err) {
    console.log(err)
    res.status(500).json('internal server error')
  }
}
