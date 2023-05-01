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
    checkEmailExistence(req.body).then((emailExist?: boolean) => {
        if (emailExist !== undefined) {
            if (!emailExist) {
                newUserInsertion(req.body).then((newUser?: User) => {
                    if (newUser)
                        res.status(201).json({token: createToken(newUser), name: newUser.name, id: newUser.id})
                })
            } else {
                res.status(401).json({error: "User already exist !"})
            }
        }
    }).catch((error) => {
        console.log(error)
        res.status(400).json({error: "Database connection error !"})
    })

});

usersRouter.post('/login', userLoginMiddleware, (req: Request, res: Response) => {
    retrieveUserForLogin(req.body).then((userLogin?: User) => {
        if (userLogin) {
            res.status(200).json({token: createToken(userLogin), name: userLogin.name, id: userLogin.id});
        } else {
            res.status(401).json({error: "Invalid credentials !"})
        }
    }).catch(() => {
        res.status(400).json({error: "Database connection error !"})
    })
});

export default usersRouter;
