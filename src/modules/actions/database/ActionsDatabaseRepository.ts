import ActionDTO from "./dto/ActionDTO";
import {openConnection} from "../../../utils/databaseConnector";
import {
    getAllActionsFromDeviceRequest,
    getWaitingActionsFromDeviceRequest,
    insertAutomaticActionRequest,
    insertManualActionRequest,
    updateActionStatusToDoneRequest, updateActionStatusToErrorRequest
} from "./requests";
import {QueryResult, QueryResultRow} from "pg";

export function insertNewManualAction(deviceId: string, gardenLineId: string, requestedAt: Date) {
    return openConnection().then((client) =>
        client.query(insertManualActionRequest(), [deviceId, gardenLineId, requestedAt]));
}

export function insertNewAutomaticAction(deviceId: string, gardenLineId: string, requestedAt: Date) {
    return openConnection().then((client) =>
        client.query(insertAutomaticActionRequest(), [deviceId, gardenLineId, requestedAt]));
}

export function updateActionStatusToDone(deviceId: string, lineId:string, occuredAt: Date) {
    return openConnection().then((client) =>
        client.query(updateActionStatusToDoneRequest(), [occuredAt, deviceId, lineId]));
}

export function updateActionStatusToError(deviceId: string, lineId:string, occuredAt: Date) {
    return openConnection().then((client) =>
        client.query(updateActionStatusToErrorRequest(), [occuredAt, deviceId, lineId]));
}

export function retrieveWaitingActionsFromDevice(deviceId: string) {
    return openConnection().then((client) => {
        return client.query(getWaitingActionsFromDeviceRequest(), [deviceId])
            .then((result: QueryResult ) => {
                let actionsList: Array<ActionDTO> = [];
                result.rows.forEach((row: QueryResultRow) =>
                    actionsList.push(ActionDTO.fromRow(row)))
                return actionsList;
            })
    });
}

export function retrieveAllActionsFromDevice(deviceId: string) {
    return openConnection().then((client) => {
        return client.query(getAllActionsFromDeviceRequest(), [deviceId])
            .then((result: QueryResult ) => {
                let actionsList: Array<ActionDTO> = [];
                result.rows.forEach((row: QueryResultRow) =>
                    actionsList.push(ActionDTO.fromRow(row)))
                return actionsList;
            })
    });
}
