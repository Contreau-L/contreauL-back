import HumidityLevelDTO from "./dto/HumidityLevelDTO";
import {openConnection} from "../../../utils/databaseConnector";
import {PoolClient} from "pg";
import {getHumidityLevelCreationRequest} from "./requests";

export function insertNewHumidityLevel(level: HumidityLevelDTO) {
    return openConnection().then((client: PoolClient) =>
        client.query(getHumidityLevelCreationRequest(), level.toQueryParam())
            .catch((error) => console.error(error))
    )
}