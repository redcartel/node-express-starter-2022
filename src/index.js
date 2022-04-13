import dotenv from 'dotenv';
dotenv.config();
import config from 'src/config';
import app from 'src/app';

app.listen(config.port, ()=>{
    console.log(`🚀`);
    console.log(`listening on ${config.port} with NODE_ENV=${config.nodeEnv}`);
})