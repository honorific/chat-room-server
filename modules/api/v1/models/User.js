import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    username: {type: String, required: true, min: 3, max: 20, unique: true},
  },
  {timestamps: true},
)

export default UserSchema
