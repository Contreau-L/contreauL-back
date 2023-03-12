import express, {NextFunction, Request, Response} from 'express';
import dotenv from "dotenv";
import usersRouter from "./modules/users/UsersRoute";
import weatherRouter from "./modules/weather/WeatherRoute";
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

app.use('/v1/weather', weatherRouter)

app.listen(8080, () => {
    console.log('Server started on port 8080 : http://localhost:8080/v1');
});

// initialize({
//     app,
//     apiDoc:
// });
