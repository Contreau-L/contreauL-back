import {openConnection} from "../../../../utils/databaseConnector";
import {PoolClient} from "pg";
import {getConnectionHistoryCreationRequest} from "./requests";
import ConnectionDTO from "./dto/ConnectionDTO";

export function insertNewConnection(connection: ConnectionDTO) {
    return openConnection().then((client: PoolClient) =>
        client.query(getConnectionHistoryCreationRequest(), connection.toQueryParam())
            .catch((error) => console.error(error))
            .finally(() => client.release())
    )
}