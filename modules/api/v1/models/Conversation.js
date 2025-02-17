import mongoose from 'mongoose'

const membersSchema = new mongoose.Schema({
  sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  receiver: {
    type: mongoose.Schema.Types.ObjectId, // Ensures receiver is always an ObjectId
    refPath: 'receiverModel', // Dynamically reference either 'User' or 'Room'
    required: true,
  },
  receiverModel: {
    type: String,
    required: true,
    enum: ['User', 'Room'], // Ensures only 'User' or 'Room' can be referenced
  },
})

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: [membersSchema],
    },
  },
  {timestamps: true},
)

export default mongoose.model('Conversation', ConversationSchema)
