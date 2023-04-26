import {latestLogFromDeviceRetrieval} from "../../logs/services/domain/LogsService";
import Log from "../../logs/services/domain/model/Log";
import {humidityLevelFromLogAndLineRetrieval} from "../../humidityLevels/domain/HumidityLevelsService";
import GardenLine from "../../gardenLines/services/domain/model/GardenLine";
import HumidityLevel from "../../humidityLevels/domain/model/HumidityLevel";
import Device from "../../devices/services/domain/model/Device";
import {isRainExpectedForNext24Hours} from "../../weather/services/logic/WeatherDecision";
import {newAutomaticActionInsertion} from "../domain/ActionServices";

export function checkLineState(deviceId: string, line: GardenLine) {
    return latestLogFromDeviceRetrieval(deviceId)
        .then((log: Log | null) => {
            if (log !== null)
                return humidityLevelFromLogAndLineRetrieval(log.id!, line.id!)
                    .then((level: HumidityLevel | null) => {
                            if (level !== null)
                                return level.humidityLevel - 0.1 < line.humidityThreshold
                            else
                                return null;
                        }
                    )
            else
                return null
        });
}

export function createAutomaticActionOnLineIfNeeded(device: Device, line: GardenLine) {
    checkLineState(device.idMac, line).then((state: boolean | null) => {
        if (state !== null)
            isRainExpectedForNext24Hours(device.insee)
                .then((isRaining: boolean) => {
                    if (state && !isRaining)
                        newAutomaticActionInsertion(device.idMac, line.id!);
                });
    });
}