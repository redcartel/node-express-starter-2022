import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
const app = express()
app.use(cors())
app.use(helmet())
app.use(morgan('tiny'))
app.use(express.json())

app.get('/', (req,res)=>{
    res.json({'message': 'hello'});
})

export default app;