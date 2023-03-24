import express, {Request, Response} from "express";
import {deviceAuthentificationMiddleware} from "./DevicesMiddleware";
import {checkDeviceExistence, newDeviceInsertion} from "./services/domain/DevicesService";
import Device from "./services/domain/model/Device";

const devicesRouter = express.Router();

devicesRouter.post('/:id/identification', deviceAuthentificationMiddleware, (req: Request, res: Response) => {
    const idMac = req.params.id as unknown as number;
    checkDeviceExistence(idMac).then((deviceExist?: boolean) => {
        if (deviceExist !== undefined) {
            if (!deviceExist)
                newDeviceInsertion(new Device( idMac, "test", 2, 2, 62500 ));
            res.status(200).json({id: idMac});
        }
    }).catch(() => {
        res.status(400).json({error: "Database connection error !"})
    })
})