import express, {Request, Response} from "express";
import {
    checkDeviceIdMiddleware, checkDeviceInformationsMiddleware, checkUserIdMiddleware,
    deviceAuthentificationMiddleware,
    deviceThresholdsListMiddleware
} from "./DevicesMiddleware";
import {
    checkDeviceAttachementToUser,
    checkDeviceExistence,
    deviceByIdRetrieval, deviceInformationsFromIdUpdate,
    newDeviceInsertion
} from "./services/domain/DevicesService";
import Device from "./services/domain/model/Device";
import {
    latestConnectionFromDeviceRetrieval,
    newConnectionInsertion
} from "../connection/services/domain/ConnectionHistoryService";
import Connection from "../connection/services/domain/model/Connection";
import {
    gardenLinesListRetrieval,
    humidityThresholdListRetrieval,
    newGardenLineInsertion
} from "../gardenLines/services/domain/GardenLinesService";
import GardenLine from "../gardenLines/services/domain/model/GardenLine";
import {
    attachedDeviceToUser,
    retrieveDevicesAttachedToUser
} from "./services/database/DevicesDatabaseRepository";
import {checkUserExistence} from "../users/services/domain/UsersService";
import {latestLogFromDeviceRetrieval} from "../logs/services/domain/LogsService";
import Log from "../logs/services/domain/model/Log";
import gardenLine from "../gardenLines/services/domain/model/GardenLine";
import {createAutomaticActionOnLineIfNeeded} from "../actions/logic/ActionsDecision";

const devicesRouter = express.Router();

devicesRouter.get('/:id/thresholds', deviceThresholdsListMiddleware, (req: Request, res: Response) => {
    const idMac = req.params.id;
    checkDeviceExistence(idMac).then((deviceExist: boolean) => {
        if (deviceExist)
            humidityThresholdListRetrieval(idMac.toString())
                .then((thresholdsList: Array<string>) => res.status(200).json({thresholds: thresholdsList}));
        else
            res.status(401).json({error: "Device doesn't exist !"});
    }).catch(() => {
        res.status(400).json({error: "Database connection error !"})
    })
})

devicesRouter.get('/attached', checkUserIdMiddleware, (req: Request, res: Response) => {
    const userId = req.query.user as unknown as string;
    checkUserExistence(userId).then((deviceExist: boolean) => {
        if (deviceExist) {
            retrieveDevicesAttachedToUser(userId)
                .then((devicesId: Array<string>) => {
                    let promisesList: Array<Promise<any>> = [];
                    devicesId.forEach((deviceId: string) => promisesList.push(deviceByIdRetrieval(deviceId)));
                    Promise.all(promisesList).then((devices) => res.status(200).json({devices: devices}))
                })
        } else {
            res.status(401).json({error: "User doesn't exist !"});
        }
    }).catch((error) => {
        console.log(error)
        res.status(400).json({error: "Database connection error !"})
    })
})

devicesRouter.get('/:id/context', checkDeviceIdMiddleware, (req: Request, res: Response) => {
    const idMac = req.params.id;
    checkDeviceExistence(idMac).then((deviceExist: boolean) => {
        if (deviceExist)
            latestLogFromDeviceRetrieval(idMac)
                .then((log: Log | null) =>
                    latestConnectionFromDeviceRetrieval(idMac)
                        .then((connexion: Connection) => {
                            const deviceContext = {
                                last_connexion: connexion.occurredAt,
                                water_temperature: log?.waterTemperature,
                                water_level: log?.waterLevel,
                                ph: log?.waterLevel,
                                occurred_at: log?.occuredAt
                            }
                            res.status(200).json({context: deviceContext});
                        }))
        else
            res.status(401).json({error: "Device doesn't exist !"});
    }).catch(() => {
        res.status(400).json({error: "Database connection error !"})
    })
})
devicesRouter.post('/:id/identification', deviceAuthentificationMiddleware, (req: Request, res: Response) => {
    const idMac = req.params.id;
    const linesNumber = req.query.lines as unknown as number;
    checkDeviceExistence(idMac).then((deviceExist: boolean) => {
        if (!deviceExist) {
            newDeviceInsertion(new Device(idMac, "undefined", 0))
                .then(() => {
                        for (let index: number = 1; index <= linesNumber; index++) {
                            newGardenLineInsertion(new GardenLine(
                                idMac.toString(),
                                "undefined",
                                0,
                                index,
                                true
                            ))
                        }
                    }
                )
        } else {
            deviceByIdRetrieval(idMac).then((device: Device) => {
                if (device.insee !== 0) {
                    gardenLinesListRetrieval(idMac).then((lines: Array<gardenLine>) => {
                        lines.forEach((line: gardenLine) => {
                            if (line.status)
                                createAutomaticActionOnLineIfNeeded(device, line);
                        })
                    })
                }
            })
        }
        newConnectionInsertion(new Connection(idMac.toString(), new Date()))
        res.status(200).json({id: idMac});
    }).catch(() => {
        res.status(400).json({error: "Database connection error !"})
    })
});

devicesRouter.post('/:id/attached', checkDeviceIdMiddleware, checkUserIdMiddleware, (req: Request, res: Response) => {
    const idMac = req.params.id;
    const userId = req.query.user as unknown as string;
    checkDeviceExistence(idMac).then((deviceExist: boolean) => {
        if (deviceExist) {
            checkUserExistence(userId).then((deviceExist: boolean) => {
                if (deviceExist) {
                    checkDeviceAttachementToUser(userId, idMac).then((deviceAttached: boolean) => {
                        if (!deviceAttached)
                            attachedDeviceToUser(userId, idMac);
                        res.status(200).json({message: "User attached to the given device !"})
                    })
                } else
                    res.status(401).json({error: "User doesn't exist !"});
            })
        } else {
            res.status(401).json({error: "Device doesn't exist !"});
        }
    }).catch(() => {
        res.status(400).json({error: "Database connection error !"})
    })
});

devicesRouter.patch('/:id', checkDeviceIdMiddleware, checkDeviceInformationsMiddleware, (req: Request, res: Response) => {
    const idMac = req.params.id;
    checkDeviceExistence(idMac).then((deviceExist: boolean) => {
        if (deviceExist) {
            deviceInformationsFromIdUpdate(req.body.name, req.body.insee, idMac)
                .then(() => res.status(200).json({message: "Device informations have been updated !"}))
        } else {
            res.status(401).json({error: "Device doesn't exist !"});
        }
    }).catch(() => {
        res.status(400).json({error: "Database connection error !"})
    })
})

export default devicesRouter;