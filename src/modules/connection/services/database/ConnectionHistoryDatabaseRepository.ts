import {openConnection} from "../../../../utils/databaseConnector";
import {PoolClient, QueryResult} from "pg";
import {getConnectionHistoryCreationRequest, getLastConnectionFromDeviceIdRequest} from "./requests";
import ConnectionDTO from "./dto/ConnectionDTO";

export function insertNewConnection(connection: ConnectionDTO) {
    return openConnection().then((client: PoolClient) =>
        client.query(getConnectionHistoryCreationRequest(), connection.toQueryParam())
            .catch((error) => console.error(error))
    )
}

export function retrieveLastConnectionFromDeviceId(deviceId: string) {
    return openConnection().then((client: PoolClient) =>
        client.query(getLastConnectionFromDeviceIdRequest(), [deviceId])
            .then((result: QueryResult) => ConnectionDTO.fromRow(result.rows[0])));
}