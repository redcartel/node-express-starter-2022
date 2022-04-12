import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import errorHandler from './middlewares/errorHandler.js';
import root from './routes/root.js';
import fourOhFour from './middlewares/fourOhFour.js';

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('tiny'));

// TOP LEVEL ROUTES HERE
app.use('/', root);

// KEEP THESE AFTER THE ROUTES
app.use(errorHandler);
app.use(fourOhFour);

export default app;