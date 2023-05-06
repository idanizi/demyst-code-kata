import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import morgan from 'morgan'

dotenv.config()

const app: Express = express();
const port = process.env.PORT || 8080;
const host = "localhost";
const protocol = "http"

app.use(morgan('short'))

app.get('/', (req: Request, res: Response) => {
    res.send('ok');
})

app.get('/health', (req: Request, res: Response) => {
    res.sendStatus(200)
});

app.listen(port, () => {
    console.log(`🚀 Server is running at ${protocol}://${host}:${port}`)
});