import Conversation from '../../models/Conversation'

export const checkConversationWithTwoIds = async (sender, receiver) => {
  try {
    const convInDb = await Conversation.findOne({
      members: {$all: [sender, receiver]},
    })
    if (convInDb) return true
  } catch (err) {
    console.log(err)
    return false
  }
}
