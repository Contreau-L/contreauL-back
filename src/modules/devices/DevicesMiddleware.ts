import {NextFunction, Request, Response} from "express";

export function deviceAuthentificationMiddleware(req: Request, res: Response, next: NextFunction){
    if(!req.params.id)
        res.status(400).json({error: "Id mac param is missing !"});
    else if (!req.query.lines)
        res.status(400).json({error: "Number of lines query param is missing !"})
    else
        next();
}

export function deviceThresholdsListMiddleware(req: Request, res: Response, next: NextFunction): void{
    if(!req.params.id)
        res.status(400).json({error: "Id mac param is missing !"});
    else
        next();
}

export function checkDeviceIdMiddleware(req: Request, res: Response, next: NextFunction): void{
    if(!req.params.id)
        res.status(400).json({error: "Id mac param is missing !"});
    else
        next();
}

export function checkUserIdMiddleware(req: Request, res: Response, next: NextFunction): void{
    if(!req.query.user)
        res.status(400).json({error: "User id query param is missing !"});
    else
        next();
}