import express from 'express';
import config from '../config.js';
import movieRouter from './routes/movies.js'
const app = express();

const port = config.port || 5000;

app.use('/api',movieRouter);

app.listen(port,() =>{
    console.log(`Server is listening on port ${port}`);
})