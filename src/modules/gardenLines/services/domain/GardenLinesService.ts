import GardenLine from "./model/GardenLine";
import {
    insertNewGardenLine,
    retrieveGardenLineListFromDevice,
    retrieveHumidityThresholdListFromDevice
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