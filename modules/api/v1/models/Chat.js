import mongoose from 'mongoose'

const messagesSchema = new mongoose.Schema({
  sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  conversationId: {type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true},
  dateTime: {type: Date, required: true},
  msg: {type: String, required: true},
})

const ChatSchema = new mongoose.Schema({
  room: {type: String, required: true, min: 1, max: 20, unique: true},
  messages: [messagesSchema],
})

export default mongoose.model('Chat', ChatSchema)
