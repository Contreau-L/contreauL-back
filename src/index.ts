import express, {NextFunction, Request, Response} from 'express';
import dotenv from "dotenv";
import usersRouter from "./modules/users/UsersRoute";
import weatherRouter from "./modules/weather/WeatherRoute";
import logsRouter from "./modules/logs/LogsRoute";
const app = express();

dotenv.config();

app.use('/v1', (req: Request, res: Response, next: NextFunction) => {
    console.log("API entry !");
    next();
})

app.post("/v1", (req: Request, res: Response) => {
    res.status(200).json({message: "Hello world !"})
})

app.use(express.json());

app.use('/v1/users', usersRouter);

app.use('/v1/weather', weatherRouter);

app.use('/v1/logs', logsRouter);

let apiPort = process.env.API_PORT ? process.env.API_PORT : 8080;
app.listen(apiPort, () => {
    console.log(`Server started on port ${apiPort} : http://localhost:${apiPort}/v1`);
});
