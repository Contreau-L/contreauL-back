import express, {NextFunction, Request, Response} from "express";
import {logCreationMiddleware} from "./LogsMiddleware";
import {newLogInsertion} from "./services/domain/LogsService";
import Log from "./services/domain/model/Log";

const logsRouter = express.Router();

logsRouter.use((req: Request, res: Response, next: NextFunction) => {
    console.log("Logs endpoint entry !");
    next();
})
logsRouter.post('/', logCreationMiddleware, (req: Request, res: Response) => {
    newLogInsertion(req.body).then((newLog?: Log) => {
        if(newLog)
            res.status(200).json({id: newLog.id});
        else
            res.status(401).json({error: "Invalid data !"});
    }).catch(() => {
        res.status(400).json({error: "Database connection error !"})
    })
})

export default logsRouter;

