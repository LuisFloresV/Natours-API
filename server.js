const dotenv = require('dotenv')
const app = require('./app')

dotenv.config({ path: './config.env' })
const port = process.env.PORT || 8001

app.listen(port, () => console.log(`App listening on Port ${port}`))