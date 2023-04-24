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

export function actionStatusUpdateToDone(deviceId: string, lineId: string, occurred_at: string ) {
    return updateActionStatusToDone(deviceId, lineId, new Date(occurred_at));
}

export function actionStatusUpdateToError(deviceId: string, lineId: string, occurred_at: string) {
    return updateActionStatusToError(deviceId, lineId, new Date(occurred_at));
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