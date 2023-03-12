import {NextFunction, Request, Response} from 'express';
import express from "express";
import {userCreationMiddleware, userLoginMiddleware} from "./UsersMiddleware";
import {checkEmailExistence, newUserInsertion, retrieveUserForLogin} from "./services/domain/UsersService";
import {createToken} from "../../utils/JWT";
import User from "./services/domain/models/User";

const usersRouter = express.Router();

usersRouter.use((req: Request, res: Response, next: NextFunction) => {
    console.log("Users endpoint entry !");
    next();
})

usersRouter.post('/', userCreationMiddleware, (req: Request, res: Response) => {
    checkEmailExistence(req.body).then(async (emailExist?: boolean) => {
        if (emailExist !== undefined) {
            if (!emailExist) {
                newUserInsertion(req.body).then((newUser?: User) => {
                    if (newUser)
                        res.status(201).json({token: createToken(newUser)})
                })
            } else {
                res.status(401).json({error: "User already exist !"})
            }
        }
    }).catch(() => {
        res.status(400).json({error: "Database connection error !"})
    })

});

usersRouter.post('/login', userLoginMiddleware, (req: Request, res: Response) => {
    retrieveUserForLogin(req.body).then((userLogin?: User) => {
        if (userLogin) {
            res.status(200).json({token: createToken(userLogin)});
        } else {
            res.status(401).json({error: "Invalid credentials !"})
        }
    }).catch(() => {
        res.status(400).json({error: "Database connection error !"})
    })
});

export default usersRouter;
