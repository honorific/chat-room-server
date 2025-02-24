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

// const mongoose = require('mongoose')
// const Members = require('./models/members') // Your Members model
// const User = require('./models/user') // Your User model
// const Room = require('./models/room') // Your Room model

// async function addMember(senderId, receiverId) {
//   try {
//     // Step 1: Check if receiverId exists in the User collection
//     const isUser = await User.exists({_id: receiverId})

//     // Step 2: Check if receiverId exists in the Room collection if not found in User
//     const isRoom = isUser ? null : await Room.exists({_id: receiverId})

//     // Step 3: Determine the receiverModel based on the results
//     let receiverModel
//     if (isUser) {
//       receiverModel = 'User'
//     } else if (isRoom) {
//       receiverModel = 'Room'
//     } else {
//       throw new Error('receiverId does not belong to User or Room collection')
//     }

//     // Step 4: Create a new member document without manually setting receiverModel
//     const newMember = new Members({
//       sender: senderId,
//       receiver: receiverId,
//       receiverModel, // Automatically detected
//     })

//     // Step 5: Save to the database
//     await newMember.save()
//     console.log('New member added successfully:', newMember)
//     return newMember
//   } catch (error) {
//     console.error('Error adding member:', error.message)
//   }
// }

// // Example Usage
// addMember(
//   new mongoose.Types.ObjectId(), // senderId
//   new mongoose.Types.ObjectId(), // receiverId (must exist in either User or Room)
// )
