import {NextFunction, Request, Response} from "express";

export function checkGardenLineIdMiddleware(req: Request, res: Response, next: NextFunction) {
    if (!req.params.id )
        res.status(400).json({ error: "Garden Line id param is missing !" });
    else
        next();
}

export function checkGardenLineStatusMiddleware(req: Request, res: Response, next: NextFunction) {
    if (!req.query.status && (req.query.status === "true" || req.query.status === "false" )) {
        res.status(400).json({ error: "Garden Line status is missing or invalid !" });
    }
    else
        next();
}

export function checkGardenLinesInformationsMiddleware(req: Request, res: Response, next: NextFunction) {
    const threshold = parseFloat(req.body.humidity_threshold);
    if (!req.body.vegetable_type || !req.body.humidity_threshold)
        res.status(400).json({ error: "Garden Line informations is missing !" });
    else if (threshold < 0 || threshold > 1 || isNaN(threshold))
        res.status(400).json({ error: "Humidity_threshold value is not valid !" });
    else
        next();
}