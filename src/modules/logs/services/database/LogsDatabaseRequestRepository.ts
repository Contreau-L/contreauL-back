import LogDTO from "../database/dto/LogDTO";
import {openConnection} from "../../../../utils/databaseConnector";
import {getLastLogsFromDeviceRequest, getLogCreationRequest} from "./requests";
import {PoolClient, QueryResult, QueryResultRow} from "pg";

export function insertNewLog(log: LogDTO): Promise<LogDTO | void> {
    return openConnection().then((client: PoolClient) =>
        client.query(getLogCreationRequest(), log.toQueryParam())
            .then((result: QueryResult) => {
                log.id = result.rows[0].id;
                return log;
            })
            .catch((error) => console.error(error))
    )
}

export function getLastLogsFromDevice(deviceId: string) {
    return openConnection().then((client: PoolClient) =>
        client.query(getLastLogsFromDeviceRequest(), [deviceId])
            .then((result: QueryResult) => {
                let logsList: Array<LogDTO> = [];
                result.rows.forEach((row: QueryResultRow) => LogDTO.fromRow(row));
                return logsList;
            }));
}