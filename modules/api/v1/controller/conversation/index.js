import Conversation from '../../models/Conversation.js'

export const checkConversationWithTwoIds = async (sender, receiver) => {
  try {
    const convInDb = await Conversation.findOne({
      members: {$all: [sender, receiver]},
    })
    if (convInDb) return convInDb
  } catch (err) {
    console.log(err)
    return false
  }
}
