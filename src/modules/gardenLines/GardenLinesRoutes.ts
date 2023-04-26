import express, {Request, Response} from "express";
import {
    checkGardenLineIdMiddleware,
    checkGardenLinesInformationsMiddleware,
    checkGardenLineStatusMiddleware
} from "./GardenLinesMiddleware";
import {
    checkGardenLineExistenceFromId, gardenLinesInformationFromIdUpdate,
    gardenLinesListRetrieval,
    gardenLineStatusFromIdUpdate
} from "./services/domain/GardenLinesService";
import {
    updateGardenLineStatusFromId
} from "./services/database/GardenLinesDatabaseRequestRepository";
import {checkDeviceIdMiddleware} from "../devices/DevicesMiddleware";
import {checkDeviceExistence} from "../devices/services/domain/DevicesService";
import GardenLine from "./services/domain/model/GardenLine";

const gardenLinesRouter = express.Router();

gardenLinesRouter.post("/:id/status", checkGardenLineIdMiddleware, checkGardenLineStatusMiddleware, (req: Request, res: Response) => {
    const lineId = req.params.id;
    const status = req.query.status == "true";
    checkGardenLineExistenceFromId(lineId).then((lineExist: boolean) => {
        if (lineExist)
            gardenLineStatusFromIdUpdate(lineId, status).then(() =>
                res.status(200).json({message: "Garden line status have been updated !"})
            )
        else
            res.status(400).json({error: "Garden line doesn't exist !"})
    }).catch(() => {
        res.status(400).json({error: "Database connection error !"})
    })
})

gardenLinesRouter.get("/:id", checkDeviceIdMiddleware, (req: Request, res: Response) => {
    const deviceId = req.params.id;
    checkDeviceExistence(deviceId).then((deviceExist: boolean) => {
        if (deviceExist)
            gardenLinesListRetrieval(deviceId).then((lineList: Array<GardenLine>) => {
                res.status(200).json({lines: lineList});
            })
        else
        res.status(400).json({error: "Device doesn't exist !"})
    })
});

gardenLinesRouter.patch("/:id", checkGardenLinesInformationsMiddleware, (req: Request, res: Response) => {
    const lineId = req.params.id;
    checkGardenLineExistenceFromId(lineId).then((lineExist: boolean) => {
        if (lineExist)
            gardenLinesInformationFromIdUpdate(req.body.vegetable_type!, req.body.humidity_threshold, lineId).then(() =>
                res.status(200).json({message: "Garden line informations have been updated !"})
            )
        else
            res.status(400).json({error: "Garden line doesn't exist !"})
    }).catch(() => {
        res.status(400).json({error: "Database connection error !"})
    })
})

export default gardenLinesRouter;