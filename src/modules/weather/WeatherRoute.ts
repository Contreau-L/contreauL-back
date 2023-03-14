import express, {NextFunction, Request, Response} from "express";
import {todayWeatherForecastMiddleware} from "./WeatherMiddleware";
import {retrieveWeatherForecastForToday} from "./services/domain/WeatherService";
import WeatherForecast from "./services/domain/model/WeatherForecast";

const weatherRouter = express.Router();

weatherRouter.use((req: Request, res: Response, next: NextFunction) => {
    console.log("Weather endpoint entry !")
    next();
})

weatherRouter.get('/today', todayWeatherForecastMiddleware, (req: Request, res: Response) => {
    retrieveWeatherForecastForToday(req.query.insee as unknown as string)
        .then((forecastForToday: Array<WeatherForecast>) => {
            res.status(200).json({weather: forecastForToday})
        }).catch((error) => {
            res.status(404).json({error: error})
        })
})

export default weatherRouter;