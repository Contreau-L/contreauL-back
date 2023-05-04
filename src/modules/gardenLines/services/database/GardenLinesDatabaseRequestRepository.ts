import GardenLineDTO from "./dto/GardenLineDTO";
import {openConnection} from "../../../../utils/databaseConnector";
import {PoolClient, QueryResult, QueryResultRow} from "pg";
import {
    getGardenLineCreationRequest,
    getGardenLineFromDeviceAndLineIndexRequest, getGardenLineFromIdRequest,
    getGardenLineListFromDeviceSelectionRequest, getGardenLinesInformationsUpdateFromIdRequest,
    getGardenLineStatusUpdateFromIdRequest,
    getHumidityTresholdFromGardenLineRequest,
    getHumidityTresholdListFromDeviceRequest
} from "./requests";

export function insertNewGardenLine(line: GardenLineDTO) {
    return openConnection().then((client: PoolClient) =>
        client.query(getGardenLineCreationRequest(), line.toQueryParam())
            .catch((error) => console.error(error)));
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

export function retrieveHumidityThresholdFromGardenLine(gardenLineId: string): Promise<any> {
    return openConnection().then((client: PoolClient) =>
        client.query(getHumidityTresholdFromGardenLineRequest(), [gardenLineId]))
        .then((result: QueryResult) => {
            return {threshold: result.rows[0].humidity_threshold, index: result.rows[0].line_index, status: result.rows[0].status};
        });
}

export function retrieveGardenLineIdFromDeviceAndIndex(deviceId: string, lineIndex: number) {
    return openConnection().then((client: PoolClient) =>
        client.query(getGardenLineFromDeviceAndLineIndexRequest(), [deviceId, lineIndex])
            .then((result: QueryResult) => result.rows[0].id));
}

export function existGardenLineFromId(lineId: string) {
    return openConnection().then((client: PoolClient) =>
        client.query(getGardenLineFromIdRequest(), [lineId])
            .then((result: QueryResult) => result.rows.length > 0));
}

export function getGardenLineIndexFromId(lineId: string) {
    return openConnection().then((client: PoolClient) =>
        client.query(getGardenLineFromIdRequest(), [lineId])
            .then((result: QueryResult) => result.rows[0].line_index));
}

export function updateGardenLineStatusFromId(lineId: string, status: boolean) {
    return openConnection().then((client: PoolClient) =>
        client.query(getGardenLineStatusUpdateFromIdRequest(), [status, lineId]));
}

export function updateGardenLinesInformationsFromId(vegetableType: string, humidityThreshold: number, lineId: string) {
    return openConnection().then((client: PoolClient) =>
        client.query(getGardenLinesInformationsUpdateFromIdRequest(), [vegetableType, humidityThreshold, lineId]));
}