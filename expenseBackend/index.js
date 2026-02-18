const express = require("express")
require('dotenv').config()
const app = express()
const PORT = 3001
const mongoose = require('mongoose')
const Transaction = require('./src/models/transaction')
const cors = require('cors')
var morgan = require('morgan')

const middleware = morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens.body(req, res)
    ].join(' ')
})

morgan.token('body', (req) => { return JSON.stringify(req.body); });
app.use(middleware)
app.use(express.json());
app.use(cors()) // Put this above your routes!
const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose.connect(url, { family: 4 })

app.get('/api/transactions', (request, response) => {
    Transaction.find({}).then(records=>{
        response.json(records)
    })
})

app.get('/api/balance', (request, response) => {
    Transaction.find({}).then(transactions=>{
    const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
    const expense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
    return response.json({ income, expense, balance: income - expense })
})
})

app.get('/api/transactions/:id', (request, response) => {
    Transaction.findById(request.params.id)

       .then(transaction => {
            if (transaction) {
                response.json(transaction)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => {
            console.log(error)
            response.status(400).send({ error: 'malformatted id' })
        })
})

app.delete('/api/transactions/:id', (request, response) => {
   Transaction.findByIdAndDelete(request.params.id)
   .then(result=>{
    response.status(204).end()
   })
   .catch(error=>{
    console.log(error)
    response.status(400).send({error:'malformatted id'})
   })

})

app.post('/api/transactions', (request, response) => {
    const body = request.body
    
    
    if (!body.title || !body.amount || !body.type) {
        return response.status(400).json({ error: 'title, amount, or type missing' })
    }


    const transaction =new Transaction ({
        title: body.title,
        amount: Number(body.amount),
        type: body.type, // 'income' or 'expense'
        date: body.date || new Date().toISOString().split('T')[0]
    })
    
   transaction.save().then(savedTransaction => {
        response.json(savedTransaction)
    })
})

app.listen(PORT, () => { console.log(`Server running on port ${PORT}`); });