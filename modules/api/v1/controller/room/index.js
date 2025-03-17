import Room from '../../models/Room.js'

export const createRoom = async (req, res) => {
  try {
    const newRoom = new Room({
      roomTitle: req.body.roomTitle,
    })

    const room = await newRoom.save()
    res.status(201).json({
      roomTitle: room.roomTitle,
    })
  } catch (err) {
    console.log(err)
    if (err.code === 11000) {
      return res.status(400).json({error: 'roomTitle must be unique'})
    }
    res.status(500).json('failed to create room')
  }
}
