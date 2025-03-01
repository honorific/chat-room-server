import mongoose from 'mongoose'
import Conversation from '../../models/Conversation.js'

export const checkConversationWithTwoIds = async (sender, receiver) => {
  try {
    const receiverInDb = await User.aggregate([
      {$match: {_id: new mongoose.Types.ObjectId(String(receiver))}}, // Check in User
      {
        $unionWith: {
          coll: 'Room', // Name of the second collection (use actual MongoDB collection name)
          pipeline: [
            {$match: {_id: new mongoose.Types.ObjectId(String(receiver))}},
          ], // Check in room
        },
      },
    ])
    if (receiverInDb) {
      try {
        const convInDb = await Conversation.findOne({
          $or: [
            {
              'members.sender': new mongoose.Types.ObjectId(String(sender)),
              'members.receiver': new mongoose.Types.ObjectId(String(receiver)),
            },
            {
              'members.sender': new mongoose.Types.ObjectId(String(receiver)),
              'members.receiver': new mongoose.Types.ObjectId(String(sender)),
            },
          ],
        })
        if (convInDb) {
          console.log('convInDb is: ', convInDb)
          return convInDb
        } else {
          return false
        }
      } catch (err) {
        console.log(err)
        return false
      }
    }
  } catch (err) {
    console.log(err)
    res.status(400).json('invalid receiver')
  }
}
