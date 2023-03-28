import express, {NextFunction, Request, Response} from "express";
import {logCreationMiddleware} from "./LogsMiddleware";
import {newLogInsertion} from "./services/domain/LogsService";
import Log from "./services/domain/model/Log";
import {checkDeviceExistence} from "../devices/services/domain/DevicesService";
import {newHumidityLevelInsertion} from "../humidityLevels/domain/HumidityLevelsService";
import HumidityLevel from "../humidityLevels/domain/model/HumidityLevel";
import {gardenLinesListRetrieval} from "../gardenLines/services/domain/GardenLinesService";
import GardenLine from "../gardenLines/services/domain/model/GardenLine";

const logsRouter = express.Router();

logsRouter.use((req: Request, res: Response, next: NextFunction) => {
    console.log("Logs endpoint entry !");
    next();
})
logsRouter.post('/', logCreationMiddleware, (req: Request, res: Response) => {
    checkDeviceExistence(req.body.device).then((deviceExist?: boolean) => {
        if (deviceExist !== undefined) {
            if (deviceExist)
                newLogInsertion(req.body.log).then((newLog?: Log) => {
                    if (newLog && newLog.id) {
                        gardenLinesListRetrieval(req.body.device).then((linesList: Array<GardenLine>) =>
                            linesList.forEach((line: GardenLine, index: number) => {
                                newHumidityLevelInsertion( new HumidityLevel(
                                    newLog.id!,
                                    line.id!,
                                    req.body.humidity_values[index]
                                ))
                            })
                        )
                        res.status(200).json({id: newLog.id});
                    }
                    else
                        res.status(401).json({error: "Invalid data !"});
                })
            else
                res.status(401).json({error: "Device doesn't exist !"});
        }
    }).catch(() => {
        res.status(400).json({error: "Database connection error !"})
    })
})

export default logsRouter;

