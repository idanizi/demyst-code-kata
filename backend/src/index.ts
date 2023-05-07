import express, {Express} from "express";
import dotenv from "dotenv";
import morgan from 'morgan'
import router from "./routes";

dotenv.config()

const app: Express = express();
const port = process.env.PORT || 8080;
const host = "localhost";
const protocol = "http"

// init middlewares
app.use(morgan('short'))

// init routes
app.use(router)

app.listen(port, () => {
    console.log(`🚀 Server is running at ${protocol}://${host}:${port}`)
});