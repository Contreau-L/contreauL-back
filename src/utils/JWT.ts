import * as jwt from 'jsonwebtoken';
import User from "../modules/users/services/domain/models/User";
import {NextFunction, Request, Response} from "express";

const SECRET_KEY = process.env.JWT_KEY || 'default_key';

export function createToken(user: User): string {
    const payload = { id: user.id, name: user.name, email: user.email };
    const options = { expiresIn: '12h' };
    return jwt.sign(payload, SECRET_KEY, options);
}

export function verifyToken(token: string): Promise<User> {
    return new Promise((resolve, reject) => {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded as User);
            }
        });
    });
}

function headerAuthorizationMiddleware(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
        return res.status(403).json({ error: 'No credentials sent!' });
    } else {
        return verifyToken(req.headers.authorization)
            .then((payload: User) => {
                req.body.user = payload;
                next();
            })
            .catch((error: any) => res.status(403).json({ error: error }))
    }
}