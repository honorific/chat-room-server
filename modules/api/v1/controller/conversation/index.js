import mongoose from 'mongoose'
import Conversation from '../../models/Conversation.js'

export const checkConversationWithTwoIds = async (sender, receiver) => {
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
