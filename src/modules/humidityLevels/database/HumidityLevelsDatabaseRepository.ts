import HumidityLevelDTO from "./dto/HumidityLevelDTO";
import {openConnection} from "../../../utils/databaseConnector";
import {PoolClient, QueryResult} from "pg";
import {getHumidityLevelCreationRequest, getRetrieveHumidityLevelFromLogAndLineRequest} from "./requests";

export function insertNewHumidityLevel(level: HumidityLevelDTO) {
    return openConnection().then((client: PoolClient) =>
        client.query(getHumidityLevelCreationRequest(), level.toQueryParam())
            .catch((error) => console.error(error))
    )
}

export function retrieveHumidityLevelFromLogAndLine(logId: string, lineId: string) {
    return openConnection().then((client: PoolClient) =>
        client.query(getRetrieveHumidityLevelFromLogAndLineRequest(), [logId, lineId])
            .then((result: QueryResult) => {
                if (result.rows[0])
                    return HumidityLevelDTO.fromRow(result.rows[0])
                else
                    return null
            }));
}