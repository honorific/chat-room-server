import Chat from '../../models/Chat.js'
import Conversation from '../../models/Conversation.js'
import User from '../../models/User.js'
import Room from '../../models/Room.js'
import {checkConversationWithTwoIds} from '../conversation/index.js'
import mongoose from 'mongoose'

export const sendMessage = async (req, res) => {
  const messages = {
    sender: req.body.sender,
    receiver: req.body.receiver,
    dateTime: req.body.dateTime,
    msg: req.body.msg,
  }
  try {
    const relatedConversation = await checkConversationWithTwoIds(
      req.body.sender,
      req.body.receiver,
    )
    console.log('relatedConversation is: ', relatedConversation)
    if (relatedConversation) {
      try {
        const newMessage = await Chat.updateOne(
          {conversation: relatedConversation._id},
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
        const isUser = await User.exists({_id: req.body.receiver})

        // Step 2: Check if receiverId exists in the Room collection if not found in User
        const isRoom = isUser
          ? null
          : await Room.exists({_id: req.body.receiver})

        // Step 3: Determine the receiverModel based on the results
        let receiverModel
        if (isUser) {
          receiverModel = 'User'
        } else if (isRoom) {
          receiverModel = 'Room'
        } else {
          res
            .status(422)
            .json('receiverId does not belong to User or Room collection')
        }
        try {
          const newConversation = new Conversation({
            members: {
              sender: new mongoose.Types.ObjectId(String(req.body.sender)),
              receiver: new mongoose.Types.ObjectId(String(req.body.receiver)),
              receiverModel,
            },
          })
          console.log(
            'sender in mongoose Id is: ',
            new mongoose.Types.ObjectId(String(req.body.receiver)),
          )
          const conversationAdded = await newConversation.save()
          console.log('conversationAdded is:', conversationAdded)
          if (conversationAdded) {
            try {
              const newMessage = new Chat({
                conversation: conversationAdded._id,
                messages,
              })
              const newMessageResponse = await newMessage.save()
              res.status(201).json({success: true, newMessageResponse})
            } catch (err) {
              console.log(err)
              res.status(400).json('could not create a new message')
            }
          } else {
            res.status(400).json('could not send the message')
          }
        } catch (err) {
          console.log(err)
          res.status(500).json('message server error')
        }
      } catch (err) {
        console.log(err)
        res.status(400).json('request proccess failed')
      }
    }
  } catch (err) {
    console.log(err)
    res.status(400).json('couldnt search among rooms and users')
  }
}
