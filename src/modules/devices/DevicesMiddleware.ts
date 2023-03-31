import {NextFunction, Request, Response} from "express";

export function deviceAuthentificationMiddleware(req: Request, res: Response, next: NextFunction){
    if(!req.params.id)
        res.status(400).json({error: "Id mac query param is missing !"});
    else
        next();
}

export function deviceTresholdsListMiddleware(req: Request, res: Response, next: NextFunction): void{
    if(!req.params.id)
        res.status(400).json({error: "Id mac query param is missing !"});
    else
        next();
}