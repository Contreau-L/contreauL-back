import {openConnection} from "../../../../utils/databaseConnector";
import {PoolClient, QueryResult, QueryResultRow} from "pg";
import {
    getAttachedDeviceToUserRequest, getDeviceByIdAndUserRequest, getDeviceByIdRequest,
    getDeviceCreationRequest,
    getDeviceFromIdRequest, getDeviceInformationsUpdateFromIdRequest,
    getDevicesAttachedToUserRequest
} from "./requests";
import DeviceDTO from "./dto/DeviceDTO";

export function checkDeviceFromIdMacExist(idMac: string): Promise<boolean> {
    return openConnection().then((client: PoolClient) =>
        client.query(getDeviceFromIdRequest(), [idMac])
            .then((result: QueryResult) => result.rowCount === 1)
    )
}

export function insertNewDevice(device: DeviceDTO): Promise<any> {
    return openConnection().then((client: PoolClient) =>
        client.query(getDeviceCreationRequest(), device.toQueryParam())
            .catch((error) => console.error(error))
    )
}

export function attachedDeviceToUser(userId: string, deviceId: string) {
    return openConnection().then((client: PoolClient) =>
        client.query(getAttachedDeviceToUserRequest(), [userId, deviceId]))
}

export function retrieveDevicesAttachedToUser(userId: string) {
    return openConnection().then((client: PoolClient) =>
        client.query(getDevicesAttachedToUserRequest(), [userId]).then((result: QueryResult) => {
            let devicesList: Array<string> = [];
            result.rows.forEach((row: QueryResultRow) => devicesList.push(row.device));
            return devicesList;
        }))
}

export function retrieveDeviceFromId(deviceId: string) {
    return openConnection().then((client: PoolClient) =>
        client.query(getDeviceByIdRequest(), [deviceId])
            .then((result: QueryResult) => DeviceDTO.fromRow(result.rows[0])));
}

export function checkDeviceAlreadyAttachedToUser(userId: string, deviceId: string) {
    return openConnection().then((client: PoolClient) =>
        client.query(getDeviceByIdAndUserRequest(), [deviceId, userId])
            .then((result: QueryResult) => result.rowCount > 0));
}

export function updateDeviceInformationsFromId(name: string, insee: number, deviceId: string) {
    return openConnection().then((client: PoolClient) =>
        client.query(getDeviceInformationsUpdateFromIdRequest(), [name, insee, deviceId])
    )
}

