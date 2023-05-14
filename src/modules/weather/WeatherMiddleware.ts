import {NextFunction, Request, Response} from "express";

export function todayWeatherForecastMiddleware(req: Request, res: Response, next: NextFunction) {
    if (!req.query.insee)
        res.status(400).json({error: "Code postal manquant !"});
    else
        next()
}

export function rainForTodayMiddleware(req: Request, res: Response, next: NextFunction) {
    if (!req.query.insee)
        res.status(400).json({error: "Code postal manquant !"});
    else
        next()
}