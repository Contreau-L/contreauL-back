import {NextFunction, Request, Response} from "express";
import User from "./services/domain/models/User";
import UserLogin from "./services/domain/models/UserLogin";

export function userCreationMiddleware(req: Request, res: Response, next: NextFunction) {
    if( !req.body.name || !req.body.password || !req.body.email ) {
        res.status(400).send('Champs manquants !');
    } else {
        req.body = User.convertFromBody(req.body);
        next();
    }
}

export function userLoginMiddleware(req: Request, res: Response, next: NextFunction) {
    if( !req.body.password || !req.body.email ) {
        res.status(400).send('Champs manquants !');
    } else {
        req.body = UserLogin.convertFromBody(req.body);
        next();
    }
}