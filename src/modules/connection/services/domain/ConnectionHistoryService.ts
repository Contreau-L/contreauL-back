import Connection from "./model/Connection";
import {insertNewConnection} from "../database/ConnectionHistoryDatabaseRepository";

export function newConnectionInsertion(connection: Connection) {
    return insertNewConnection(connection.toDTO());
}