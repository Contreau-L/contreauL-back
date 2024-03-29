import express, {NextFunction, Request, Response} from "express";
import {
    actionInsertionMiddleware,
    actionsRetrievalMiddleware,
    updateActionsStatusMiddleware,
    waitingActionsMiddleware
} from "./ActionsMiddleware";
import {checkDeviceExistence} from "../devices/services/domain/DevicesService";
import {
    actionsFromDevice,
    actionStatusUpdateToDone, actionStatusUpdateToError, lastActionsFromDevice,
    newManualActionInsertion,
    waitingActionsFromDeviceRetrieval
} from "./domain/ActionServices";
import Action from "./domain/model/Action";
import {
    gardenLineRetrievalFromDeviceAndIndex,
    gardenLinesListRetrieval, getGardenLineIndexById,
    humidityThresholdRetrieval
} from "../gardenLines/services/domain/GardenLinesService";
import GardenLine from "../gardenLines/services/domain/model/GardenLine";
import action from "./domain/model/Action";

const actionsRouter = express.Router();

actionsRouter.use('/', (req: Request, res: Response, next: NextFunction) => {
    console.log("Actions endpoint entry !");
    next();
})

actionsRouter.get('/:id/waiting', waitingActionsMiddleware, (req: Request, res: Response) => {
    const idMac = req.params.id;
    checkDeviceExistence(idMac).then((deviceExist: boolean) => {
        if (deviceExist)
            waitingActionsFromDeviceRetrieval(idMac).then((actionsList: Array<Action>) => {
                let actionsToSend: Array<any> = [];
                let linesIdAlreadySend: Array<string> = [];
                let PromiseList: Array<Promise<any>> = [];
                for (const action of actionsList) {
                    if(!linesIdAlreadySend.includes(action.gardenLine)) {
                        PromiseList.push(humidityThresholdRetrieval(action.gardenLine));
                        linesIdAlreadySend.push(action.gardenLine);
                    }
                }
                Promise.all(PromiseList).then((values) => {
                    values.forEach((value:any) => {
                        if (value.status)
                            actionsToSend.push({
                                threshold: value.threshold,
                                index: value.index
                            });
                    })
                    res.status(200).json({actions: actionsToSend});
                });
            });
        else
            res.status(401).json({error: "L'appareil n'existe pas !"});
    }).catch(() => {
        res.status(400).json({error: "Erreur de connexion avec la base de donnée !"});
    });
});

actionsRouter.get('/:id', actionsRetrievalMiddleware, (req: Request, res: Response) => {
    const idMac = req.params.id;
    checkDeviceExistence(idMac).then((deviceExist: boolean) => {
        if (deviceExist)
            actionsFromDevice(idMac).then((actionsList: Array<Action>) => {
                res.status(200).json({actions: actionsList});
            });
        else
            res.status(401).json({error: "L'appareil n'existe pas !"});
    }).catch(() => {
        res.status(400).json({error: "Erreur de connexion avec la base de donnée !"});
    });
});

actionsRouter.get('/:id/last', actionsRetrievalMiddleware, (req: Request, res: Response) => {
    const idMac = req.params.id;
    checkDeviceExistence(idMac).then((deviceExist: boolean) => {
        if (deviceExist)
            lastActionsFromDevice(idMac).then(async (actionsList: Array<Action>) => {
                for (const action1 of actionsList) {
                    action1.gardenLine = await getGardenLineIndexById(action1.gardenLine);
                }
                res.status(200).json({actions: actionsList});
            });
        else
            res.status(401).json({error: "L'appareil n'existe pas !"});
    }).catch(() => {
        res.status(400).json({error: "Erreur de connexion avec la base de donnée !"});
    });
});

actionsRouter.post('/status', updateActionsStatusMiddleware, async (req: Request, res: Response) => {
    let promisesList: Array<Promise<any>> = [];
    for (const action of req.body.actions) {
        const lineId: any = await gardenLineRetrievalFromDeviceAndIndex(action.id, parseInt(action.index));
        if (action.status)
            promisesList.push(actionStatusUpdateToDone(action.id, lineId, action.occurred_at));
        else
            promisesList.push(actionStatusUpdateToError(action.id, lineId, action.occurred_at));
    }
    Promise.all(promisesList).then(() => {
        res.status(200).json({message: "Toutes les actions ont été mises à jour !"});
    }).catch(() => {
        res.status(400).json({error: "Erreur de connexion avec la base de donnée !"});
    });
});

actionsRouter.post('/:id', actionInsertionMiddleware, (req: Request, res: Response) => {
    const idMac = req.params.id;
    const gardenLine = req.query.line ? req.query.line : undefined;
    checkDeviceExistence(idMac).then((deviceExist: boolean) => {
        if (deviceExist) {
            if (gardenLine) {
                console.log(gardenLine)
                newManualActionInsertion(idMac, gardenLine as string).then(() => {
                    res.status(200).json({message: "Action ajoutée !"});
                })
            } else {
                gardenLinesListRetrieval(idMac).then((gardenLineList: Array<GardenLine>) => {
                    let actionsPromiseList: Array<Promise<any>> = [];
                    gardenLineList.forEach((line: GardenLine) => {
                        actionsPromiseList.push(newManualActionInsertion(idMac, line.id!));
                    });
                    Promise.all(actionsPromiseList).then(() =>
                        res.status(200).json({message: "Toutes les actions ont été ajoutées !"})
                    );
                })
            }
        }
        else
            res.status(401).json({error: "L'appareil n'existe pas !"});
    }).catch(() => {
        res.status(400).json({error: "Erreur de connexion avec la base de donnée !"});
    });
});

export default actionsRouter;