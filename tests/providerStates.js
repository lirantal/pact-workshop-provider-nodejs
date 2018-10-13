const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const seed = require('./seed')

const STATES_API_PORT = 4011

const app = express()

const statesRouter = express.Router()

statesRouter.get('/health', function(req, res) {
  return res.status(200).end()
})

statesRouter.post('/setup', statesController)

async function statesController(req, res) {
  try {
    const state = req.body.state
    
    await seed.tableMigrate()
    console.log('Transition to state: ', state)

    switch (state) {
      case 'Has no reviews':
        await seed.clearAllData()
        break
      case 'Has a few reviews':
        await seed.clearAllData()
        await seed.populateData()
        break
      case 'Has a single review':
        // TODO
        // await seed.populateDataSingleReview()
        break
    }

    return res.status(200).end()
  } catch (err) {
    console.log(err)
    return res.status(500).end()
  }
}

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/', statesRouter)

app.listen(STATES_API_PORT)