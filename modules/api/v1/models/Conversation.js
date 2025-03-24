import mongoose from 'mongoose'

const membersSchema = new mongoose.Schema({
  sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'receiverModel', // Dynamically determines the referenced collection
  },
  receiverModel: {
    type: String,
    required: true,
    enum: ['User', 'Room'], // Ensures only 'User' or 'Room' can be referenced
  },
})

const ConversationSchema = new mongoose.Schema(
  {
    members: membersSchema,
  },
  {timestamps: true},
)

export default mongoose.model('Conversation', ConversationSchema)
