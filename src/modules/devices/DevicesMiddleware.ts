import {NextFunction, Request, Response} from "express";

export function deviceAuthentificationMiddleware(req: Request, res: Response, next: NextFunction){
    if(!req.params.id)
        res.status(400).json({error: "Adresse mac de l'appareil manquant !"});
    else if (!req.query.lines)
        res.status(400).json({error: "Nombre de lignes de l'appareil manquant !"})
    else
        next();
}

export function deviceThresholdsListMiddleware(req: Request, res: Response, next: NextFunction): void{
    if(!req.params.id)
        res.status(400).json({error: "Adresse mac de l'appareil manquant !"});
    else
        next();
}

export function checkDeviceIdMiddleware(req: Request, res: Response, next: NextFunction): void{
    if(!req.params.id)
        res.status(400).json({error: "Adresse mac de l'appareil manquant !"});
    else
        next();
}

export function checkUserIdMiddleware(req: Request, res: Response, next: NextFunction): void{
    if(!req.query.user)
        res.status(400).json({error: "L'id de l'utilisateur manquant !"});
    else
        next();
}

export function checkDeviceInformationsMiddleware(req: Request, res: Response, next: NextFunction) {
    const insee = parseInt(req.body.insee);
    if (!req.body.name ||!req.body.insee)
        res.status(400).json({error: "Champs manquants !"});
    else if (insee < 0 || insee > 100000 || isNaN(insee)) {
        res.status(400).json({error: "Code postal de l'appareil invalide !"});
    } else
        next();
}