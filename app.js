require('dotenv').config()
const express = require('express')
const apiRouter = require('./routes/apiRouter')
const app = express()
const DBConnection = require('./db/connect')
const notFound = require('./middleware/notFound')
const errorHandelerMiddleware = require('./middleware/errorHandler')

app.use(express.json())

app.use(express.static('./public'))
app.use('/api/v1/tasks', apiRouter)
app.use(notFound)
app.use(errorHandelerMiddleware)

const port = process.env.PORT || 5500

const startServer = async () => {
    try {
        await DBConnection(process.env.DB_URI)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`)
        })
    } catch (error) {
        console("Connection Error: ", error)
    }
}
startServer()
