const express = require('express')
const cors = require('cors')
const { Pool } = require('pg')
const redis = require('redis')

const app = express()

app.use(cors())
app.use(express.json())

const pgClient = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
})

pgClient.on('connect', () => {
  pgClient
    .query('CREATE TABLE IF NOT EXISTS values (number INT)')
    .catch(err => console.error(err))
})

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  retry_strategy: () => 1000,
})

const redisPublisher = redisClient.duplicate()

app.get('/', (req, res) => {
  res.send('Hello World 🛰🚀')
})

app.get('/values/all', async (req, res) => {
  const values = await pgClient.query('SELECT * FROM values')

  res.send(values.rows)
})

app.get('/values/current', async (req, res) => {
  redisClient.hgetall('values', (err, values) => {
    res.send(values)
  })
})

app.post('/values', async (req, res) => {
  const index = req.body.index

  if (parseInt(index) > 40) return res.status(422).send('Index too high')

  redisClient.hset('values', index, 'Nothing yet!')
  redisPublisher.publish('insert', index)

  pgClient.query('INSERT INTO values (number) VALUES ($1)', [index])

  res.send({ working: true })
})

app.listen(5000, () => {
  console.log('Express Server 🚆 is runnig on port 5000')
})
