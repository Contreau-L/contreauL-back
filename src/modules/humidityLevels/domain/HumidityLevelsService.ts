import HumidityLevel from "./model/HumidityLevel";
import {insertNewHumidityLevel} from "../database/HumidityLevelsDatabaseRepository";

export function newHumidityLevelInsertion(level: HumidityLevel) {
    return insertNewHumidityLevel(level.toDTO());
}