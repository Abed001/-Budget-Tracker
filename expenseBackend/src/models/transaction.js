/*
require('dotenv').config()
const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose.connect(url, { family: 4 })

const transactionSchema = new mongoose.Schema({
  title: String,
  amount: Number,
  type: String,   
  date: String,
})

transactionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
module.exports = mongoose.model('Transaction', transactionSchema)*/

require('dotenv').config()
const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0, 'Amount cannot be negative']
  },
  type: {
    type: String,
    required: [true, 'Type is required'],
    enum: ['income', 'expense'],  // 👈 Only these two allowed
    lowercase: true
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: false  // Optional for now
  },
  date: {
    type: String,
    required: [true, 'Date is required']
  },
  note: {
    type: String,
    maxlength: [500, 'Note cannot exceed 500 characters'],
    default: ''
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
    index: true  // 👈 For fast queries
  }
}, {
  timestamps: true  // 👈 Adds createdAt, updatedAt
})

// 👈 ADD INDEXES
transactionSchema.index({ userId: 1, date: -1 })  // Composite index
transactionSchema.index({ userId: 1, type: 1 })   // For filtering by type

// Format output
transactionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Transaction', transactionSchema)