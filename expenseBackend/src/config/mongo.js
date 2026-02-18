const mongoose = require('mongoose')
require('dotenv').config()
const password = process.env.MONGODB_PASSWORD
const user = process.env.MONGODB_USER


const url = `mongodb+srv://${user}:${password}@cluster0.rgjlpz6.mongodb.net/BudgetTracker?appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url, { family: 4 })


mongoose.connect(url, { family: 4 })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error.message)
  })


// CHANGE: noteSchema -> transactionSchema
const transactionSchema = new mongoose.Schema({
  title: String,
  amount: Number,
  type: String,   // 'income' or 'expense'
  date: String,
})

// CHANGE: Note -> Transaction
const Transaction = mongoose.model('Transaction', transactionSchema)

// CHANGE: note -> transaction
const transaction = new Transaction({
  title: 'Salary',
  amount: 5000,
  type: 'income',
  date: '2025-02-01',
})

Transaction.find({}).then(result => {
  result.forEach(t => {
    console.log(t)
  })
  mongoose.connection.close()
})

/*transaction.save().then(result => {
  console.log('transaction saved!')
  mongoose.connection.close()
})*/