import {
    insertNewAutomaticAction,
    insertNewManualAction, retrieveAllActionsFromDevice, retrieveWaitingActionsFromDevice,
    updateActionStatusToDone, updateActionStatusToError
} from "../database/ActionsDatabaseRepository";
import Action from "./model/Action";
import ActionDTO from "../database/dto/ActionDTO";

export function newManualActionInsertion(deviceId: string, gardenLineId: string) {
    return insertNewManualAction(deviceId, gardenLineId, new Date());
}

export function newAutomaticActionInsertion(deviceId: string, gardenLineId: string) {
    return insertNewAutomaticAction(deviceId, gardenLineId, new Date());
}

export function actionStatusUpdateToDone(actionId: string) {
    return updateActionStatusToDone(actionId, new Date());
}

export function actionStatusUpdateToError(actionId: string) {
    return updateActionStatusToError(actionId, new Date());
}

export function waitingActionsFromDeviceRetrieval(deviceId: string) {
    return retrieveWaitingActionsFromDevice(deviceId).then((actionsList: Array<ActionDTO>) => {
        let actions: Array<Action> = [];
        actionsList.forEach((actionDTO: ActionDTO) => actions.push(actionDTO.toModel()));
        return actions;
    });
}

export function actionsFromDevice(deviceId: string) {
    return retrieveAllActionsFromDevice(deviceId).then((actionsList: Array<ActionDTO>) => {
        let actions: Array<Action> = [];
        actionsList.forEach((actionDTO: ActionDTO) => actions.push(actionDTO.toModel()));
        return actions;
    });
}