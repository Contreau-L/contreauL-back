import GardenLineDTO from "./dto/gardenLineDTO";
import {openConnection} from "../../../../utils/databaseConnector";
import {PoolClient} from "pg";
import {getGardenLineCreationRequest} from "./requests";

export function insertNewGardenLine(line: GardenLineDTO) {
    openConnection().then((client: PoolClient) =>
        client.query(getGardenLineCreationRequest(), line.toQueryParam())
            .catch((error) => console.error(error))
            .finally(() => client.release()))
}