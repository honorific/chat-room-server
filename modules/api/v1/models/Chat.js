import mongoose from 'mongoose'

const messagesSchema = new mongoose.Schema({
  sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  dateTime: {type: Date, required: true},
  msg: {type: String, required: true},
})

const ChatSchema = new mongoose.Schema(
  {
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conversation',
      required: true,
    },
    messages: [messagesSchema],
  },
  {timestamps: true},
)

export default mongoose.model('Chat', ChatSchema)
