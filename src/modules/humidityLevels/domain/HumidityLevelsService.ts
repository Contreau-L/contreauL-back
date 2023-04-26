import HumidityLevel from "./model/HumidityLevel";
import {
    insertNewHumidityLevel,
    retrieveHumidityLevelFromLogAndLine
} from "../database/HumidityLevelsDatabaseRepository";
import HumidityLevelDTO from "../database/dto/HumidityLevelDTO";

export function newHumidityLevelInsertion(level: HumidityLevel) {
    return insertNewHumidityLevel(level.toDTO());
}

export function humidityLevelFromLogAndLineRetrieval(logId: string, lineId: string) {
    return retrieveHumidityLevelFromLogAndLine(logId, lineId).then((level : HumidityLevelDTO | null) => {
        if (level !== null)
            return level.toModel();
        else
            return null;
    });
}