import express,{ urlencoded } from 'express';
import config from '../config.js';
import movieRouter from './routes/movies.js';
import userRouter from './routes/user.js';
import path from 'path'; //npm install path
import cors from 'cors'; //npm install cors --save

import { fileURLToPath } from 'url';


const app = express();

const port = config.port || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors()); //Politicas de CORS para realizar metodos post desde localhost:3000 a :5000
app.use(express.json()); //Permite obtener los objetos enviados a traves del req.body
app.use(urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/public")))

app.use('/api',movieRouter);
app.use('/auth',userRouter);

app.listen(port,() =>{
    console.log(`Server is listening on port ${port}`);
})