import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';



app.listen(process.env['PORT'] ?? 3000, ()=>{
    console.log('listening on 3000');
})