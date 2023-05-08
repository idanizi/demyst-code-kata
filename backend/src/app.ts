import express, {Express} from "express";
import morgan from 'morgan'
import router from "./routes";

const app: Express = express();

// init middlewares
app.use(express.json())
app.use(morgan('dev'))

// init routes
app.use(router)

export default app;
