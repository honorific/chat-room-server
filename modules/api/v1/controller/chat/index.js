import Chat from '../../models/Chat.js'

export const sendMessage = async (req, res) => {
  try {
    const newChat = new Chat({
      room: req.body.room,
      messages: [
        {
          sender: req.body.sender,
          receiver: req.body.receiver,
          dateTime: req.body.dateTime,
          msg: req.body.msg,
        },
      ],
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
