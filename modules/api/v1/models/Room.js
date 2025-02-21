import mongoose from 'mongoose'

const RoomSchema = new mongoose.Schema(
  {
    roomTitle: {type: String, required: true, unique: true},
  },
  {timestamps: true},
)

export default mongoose.model('Room', RoomSchema)
