import Connection from "./model/Connection";
import {insertNewConnection} from "../database/connectionHistoryDatabaseRepository";

export function newConnectionInsertion(connection: Connection) {
    return insertNewConnection(connection.toDTO());
}