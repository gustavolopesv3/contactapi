import express from 'express'
import phoneRouter from './routes/phoneRoutes.js'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/',phoneRouter)


app.listen(3333, ()=>{
    console.log('Api iniciada')
})