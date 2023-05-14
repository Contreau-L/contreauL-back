import {NextFunction, Request, Response} from "express";

export function checkGardenLineIdMiddleware(req: Request, res: Response, next: NextFunction) {
    if (!req.params.id )
        res.status(400).json({ error: "Adresse mac de l'appareil manquant !" });
    else
        next();
}

export function checkGardenLineStatusMiddleware(req: Request, res: Response, next: NextFunction) {
    if (!req.query.status && (req.query.status === "true" || req.query.status === "false" )) {
        res.status(400).json({ error: "Status de la ligne manquant" });
    }
    else
        next();
}

export function checkGardenLinesInformationsMiddleware(req: Request, res: Response, next: NextFunction) {
    const threshold = parseFloat(req.body.humidity_threshold);
    if (!req.body.vegetable_type || !req.body.humidity_threshold)
        res.status(400).json({ error: "Champs manquants !" });
    else if (threshold < 0 || threshold > 100 || isNaN(threshold))
        res.status(400).json({ error: "Seuil d'humidité invalide !" });
    else
        next();
}