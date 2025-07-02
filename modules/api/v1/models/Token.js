import mongoose from 'mongoose'

const TokenSchema = new mongoose.Schema(
  {
    refreshToken: {type: String, required: true, unique: true},
    tokenId: {type: String, required: true, unique: true},
  },
  {timestamps: true},
)

export default mongoose.model('Token', TokenSchema)
