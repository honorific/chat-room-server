import Chat from '../../models/Chat.js'

export const sendMessage = async (req, res) => {
  const messages = {
    sender: req.body.sender,
    receiver: req.body.receiver,
    dateTime: req.body.dateTime,
    msg: req.body.msg,
  }
  const room = await checkRoomInDb(req.body.room)
  console.log('room is: ', room)
  if (room) {
    try {
      const newMessage = await Chat.updateOne(
        {room: req.body.room},
        {
          $push: {
            messages,
          },
        },
      )
      res.status(201).json({success: true, newMessage})
    } catch (err) {
      console.log(err)
      res.status(500).json('could not insert new message')
    }
  } else {
    try {
      const newChat = new Chat({
        room: req.body.room,
        messages: [messages],
      })

      const chat = await newChat.save()
      if (chat) {
        res.status(201).json(chat)
      } else {
        res.status(400).json('could not send the message')
      }
    } catch (err) {
      console.log(err)
      res.status(500).json('message server error')
    }
  }
}

export const checkRoomInDb = async (room) => {
  try {
    const roomInDb = await Chat.findOne({room})
    if (roomInDb) return true
  } catch (err) {
    console.log(err)
    return false
  }
}
