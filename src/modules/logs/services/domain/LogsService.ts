import Log from "./model/Log";
import {getLastLogsFromDevice, insertNewLog} from "../database/LogsDatabaseRequestRepository";
import LogDTO from "../database/dto/LogDTO";
import logDTO from "../database/dto/LogDTO";

export function newLogInsertion (log: Log) {
    return insertNewLog(log.toDTO()).then((newLog: LogDTO | void) => {
        if (newLog) {
            return newLog.toModel();
        }
    })
}

export function lastLogsFromDeviceRetrieval(deviceId: string) {
    return getLastLogsFromDevice(deviceId).then((logList: Array<LogDTO>) => {
        let logs: Array<Log> = [];
        logList.forEach((logDTO: logDTO) => logs.push(logDTO.toModel()));
        return logs;
    })
}