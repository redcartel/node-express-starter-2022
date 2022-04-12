import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';

const port = parseInt(process.env['PORT']) ?? 3000;
app.listen(port, ()=>{
    console.log(`🚀`)
    console.log(`listening on ${port} with NODE_ENV=${process.env['NODE_ENV']}`);
})