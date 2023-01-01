import express, { Express } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/connectDB'
import routes from "./routes";
import cors from 'cors';



dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



connectDB();

app.use('/', routes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});