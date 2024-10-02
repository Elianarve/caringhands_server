import connection_db from './database/connection_db.js';
import UsersModel from './models/userModel.js';
import express from 'express';
import {DB_PORT} from './config.js';
import UsersRouter from './routes/UsersRouter.js';
import authRouter from './routes/authRoter.js';
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json()); 

app.use('/user', UsersRouter );
app.use('/auth', authRouter);

try {
    connection_db.authenticate();
    console.log('Connection has been established successfully.');

    UsersModel.sync();
    console.log('Model  connected correctly 📋');

   } catch (error) {
    console.error('Unable to connect to the database:', error);
   }

   export const server = app.listen(DB_PORT, () => {
    console.log(`Server up in http://localhost:${DB_PORT}`);
   });

export default app;