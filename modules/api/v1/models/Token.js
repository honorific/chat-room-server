import mongoose from 'mongoose'

const TokenSchema = new mongoose.Schema(
  {
    username: {type: String, required: true, min: 3, max: 20, unique: true},
    gender: {type: String, required: true, enum: ['male', 'female']},
  },
  {timestamps: true},
)

export default mongoose.model('Token', TokenSchema)
