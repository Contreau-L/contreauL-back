import Connection from "./model/Connection";
import {insertNewConnection, retrieveLastConnectionFromDeviceId} from "../database/ConnectionHistoryDatabaseRepository";
import ConnectionDTO from "../database/dto/ConnectionDTO";

export function newConnectionInsertion(connection: Connection) {
    return insertNewConnection(connection.toDTO());
}

export function latestConnectionFromDeviceRetrieval(deviceId: string){
    return retrieveLastConnectionFromDeviceId(deviceId).then((connexion: ConnectionDTO) => connexion.toModel());
}