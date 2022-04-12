import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

app.get('/', (req, res)=>{
    if (process.env['NODE_ENV'] === 'production') {
        res.status(200).send();
    }
    else {
        res.json({'NODE_ENV': process.env['NODE_ENV'] ?? 'undefined'});
    }
});

export default app;