import {NextFunction, Request, Response} from "express";
import Log from "./services/domain/model/Log";

export function logCreationMiddleware(req: Request, res: Response, next: NextFunction) {
    if (!req.body.device || !req.body.water_temperature || !req.body.water_level || !req.body.occured_at || !req.body.ph )
        res.status(400).send('Requested field missing !');
    else {
        req.body = Log.fromBody(req.body);
        next();
    }
}