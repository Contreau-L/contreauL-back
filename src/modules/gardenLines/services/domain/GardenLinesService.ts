import GardenLine from "./model/GardenLine";
import {
    insertNewGardenLine,
    retrieveGardenLineListFromDevice,
    retrieveHumidityThresholdListFromDevice,
    retrieveHumidityThresholdFromGardenLine,
    retrieveGardenLineIdFromDeviceAndIndex,
    updateGardenLineStatusFromId,
    existGardenLineFromId,
    updateGardenLinesInformationsFromId, getGardenLineIndexFromId
} from "../database/GardenLinesDatabaseRequestRepository";
import GardenLineDTO from "../database/dto/GardenLineDTO";

export function newGardenLineInsertion(line: GardenLine) {
    return insertNewGardenLine(line.toDTO());
}

export function gardenLinesListRetrieval(deviceId: string) {
    return retrieveGardenLineListFromDevice(deviceId).then((linesListDTO : Array<GardenLineDTO>) => {
        let lineList: Array<GardenLine> = [];
        linesListDTO.forEach((line: GardenLineDTO) => lineList.push(line.toModel()));
        return lineList;
    })
}

export function humidityThresholdListRetrieval(deviceId: string) {
    return retrieveHumidityThresholdListFromDevice(deviceId)
        .then((humidityThresholdList: Array<string>) => humidityThresholdList);
}

export function humidityThresholdRetrieval(gardenLineId: string) {
    return retrieveHumidityThresholdFromGardenLine(gardenLineId)
        .then((humidityThreshold: any) => humidityThreshold);
}

export function gardenLineRetrievalFromDeviceAndIndex(deviceId: string, lineIndex: number) {
    return retrieveGardenLineIdFromDeviceAndIndex(deviceId, lineIndex);
}

export function checkGardenLineExistenceFromId(lineId: string) {
    return existGardenLineFromId(lineId);
}

export function getGardenLineIndexById(lineId: string) {
    return getGardenLineIndexFromId(lineId);
}

export function gardenLineStatusFromIdUpdate(lineId: string, status: boolean) {
    return updateGardenLineStatusFromId(lineId, status)
}

export function gardenLinesInformationFromIdUpdate(vegetableType: string, humidityThreshold: number, lineId: string){
    return updateGardenLinesInformationsFromId(vegetableType, humidityThreshold, lineId);
}