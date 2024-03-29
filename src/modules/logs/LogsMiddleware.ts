import {NextFunction, Request, Response} from "express";
import Log from "./services/domain/model/Log";

export function logCreationMiddleware(req: Request, res: Response, next: NextFunction) {
    if (!req.body.device || !req.body.water_temperature || !req.body.water_level || !req.body.occured_at || !req.body.ph || !req.body.humidity_values)
        res.status(400).send('Champs manquants !');
    else {
        req.body.log = Log.fromBody(req.body);
        next();
    }
}

export function logsRetrievalMiddleware(req: Request, res: Response, next: NextFunction) {
    if (!req.params.id)
        res.status(400).json({ error: "Adresse mac de l'appareil manquant !" });
    else
        next();
}