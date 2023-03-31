import GardenLineDTO from "./dto/GardenLineDTO";
import {openConnection} from "../../../../utils/databaseConnector";
import {PoolClient, QueryResult, QueryResultRow} from "pg";
import {
    getGardenLineCreationRequest,
    getGardenLineListFromDeviceSelectionRequest,
    getHumidityTresholdListFromDeviceRequest
} from "./requests";

export function insertNewGardenLine(line: GardenLineDTO) {
    return openConnection().then((client: PoolClient) =>
        client.query(getGardenLineCreationRequest(), line.toQueryParam())
            .catch((error) => console.error(error))
            .finally(() => client.release()));
}

export function retrieveGardenLineListFromDevice(deviceId: string): Promise<Array<GardenLineDTO>>{
    return openConnection().then((client: PoolClient) =>
        client.query(getGardenLineListFromDeviceSelectionRequest(), [ deviceId ])
            .then((result: QueryResult) => {
                let gardenLinesList: Array<GardenLineDTO> = [];
                result.rows.forEach((row: QueryResultRow) =>
                    gardenLinesList.push(GardenLineDTO.fromRow(row)))
                return gardenLinesList;
            })
    );
}

export function retrieveHumidityThresholdListFromDevice(deviceId: string): Promise<Array<string>> {
    return openConnection().then((client: PoolClient) =>
        client.query(getHumidityTresholdListFromDeviceRequest(), [deviceId]))
        .then((result: QueryResult) => {
            let thresholdList: Array<string> = [];
            result.rows.forEach((row: QueryResultRow) => thresholdList.push(row.humidity_threshold));
            return thresholdList;
        });
}