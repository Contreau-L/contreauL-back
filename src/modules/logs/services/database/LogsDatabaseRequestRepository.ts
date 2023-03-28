import LogDTO from "../database/dto/LogDTO";
import {openConnection} from "../../../../utils/databaseConnector";
import {getLogCreationRequest} from "./requests";
import {PoolClient, QueryResult} from "pg";

export function insertNewLog(log: LogDTO): Promise<LogDTO | void> {
    return openConnection().then((client: PoolClient) =>
        client.query(getLogCreationRequest(), log.toQueryParam())
            .then((result: QueryResult) => {
                log.id = result.rows[0].id;
                return log;
            })
            .catch((error) => console.error(error))
            .finally(() => client.release())
    )
}