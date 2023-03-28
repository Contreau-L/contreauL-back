import express, {Request, Response} from "express";
import {deviceAuthentificationMiddleware} from "./DevicesMiddleware";
import {checkDeviceExistence, newDeviceInsertion} from "./services/domain/DevicesService";
import Device from "./services/domain/model/Device";
import {newConnectionInsertion} from "../connection/services/domain/ConnectionHistoryService";
import Connection from "../connection/services/domain/model/Connection";
import {newGardenLineInsertion} from "../gardenLines/services/domain/GardenLinesService";
import GardenLine from "../gardenLines/services/domain/model/GardenLine";

const devicesRouter = express.Router();

devicesRouter.post('/:id/identification', deviceAuthentificationMiddleware, (req: Request, res: Response) => {
    const idMac = req.params.id as unknown as number;
    checkDeviceExistence(idMac).then((deviceExist?: boolean) => {
        if (deviceExist !== undefined) {
            if (!deviceExist) {
                newDeviceInsertion(new Device(idMac, "undefined", 0, 0, 0))
                    .then(() => {
                            for (let index: number = 0; index < 3; index++) {
                                newGardenLineInsertion( new GardenLine(
                                    idMac.toString(),
                                    "undefined",
                                    0,
                                    index
                                ))
                            }
                        }
                    )
            }
            newConnectionInsertion(new Connection(idMac.toString(), new Date()))
            res.status(200).json({id: idMac});
        }
    }).catch(() => {
        res.status(400).json({error: "Database connection error !"})
    })
})

export default devicesRouter;