import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import errorHandler from 'src/middlewares/errorHandler';
import root from 'src/routes/root';
import fourOhFour from 'src/middlewares/fourOhFour';

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('tiny'));

// TOP LEVEL ROUTES HERE
app.use('/', root);

// KEEP THESE AFTER THE ROUTES
app.use(fourOhFour);
app.use(errorHandler);


export default app;