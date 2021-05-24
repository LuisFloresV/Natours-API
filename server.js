const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
const app = require('./app')
const mongoose = require('mongoose')


//MongoDB Connection
const DB = process.env.DB.replace('<PASSWORD>', process.env.DB_PASSWORD)
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to DB'))
  .catch(err => console.log('Something went wrong:' + err))

//Server Listening
const port = process.env.PORT || 8001

app.listen(port, () => console.log(`App listening on Port ${port}`))