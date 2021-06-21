const dotenv = require('dotenv')

dotenv.config({ path: './config.env' })
const mongoose = require('mongoose')
const app = require('./app')

process.on('uncaughtException', (err) => {
  console.error(`Uncaught: ${err.name} ${err.message}`)
  process.exit(1)
})

// MongoDB Connection
const DB = process.env.DB.replace('<PASSWORD>', process.env.DB_PASSWORD)
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => ('Connected to DB'))

// Server Listening
const port = process.env.PORT || 8001

const server = app.listen(port, () => console.log(`App listening on Port ${port}`))

process.on('unhandledRejection', (err) => {
  console.error(`Unhandled: ${err.name} ${err.message}`)
  // Gracefully Shutdown
  server.close(() => {
    process.exit(1)
  })
})