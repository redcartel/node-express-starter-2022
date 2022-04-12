import Express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import RateLimit from 'express-rate-limit'
import morgan from 'morgan'



const limiter = RateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
})

const app = Express()
app.use(cors())
app.use(helmet())
app.use(limiter)
app.use(morgan('tiny'))
app.use(Express.json())

app.get('/', (req,res)=>{
    res.json({'message': 'hello'});
})


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on port ${port}`))