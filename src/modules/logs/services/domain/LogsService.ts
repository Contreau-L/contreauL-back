import Log from "./model/Log";
import {
    getLastLogsFromDevice,
    getLatestLogFromDevice,
    insertNewLog,
    retrieveLastMonthLogsFromDevice
} from "../database/LogsDatabaseRequestRepository";
import LogDTO from "../database/dto/LogDTO";
import logDTO from "../database/dto/LogDTO";

export function newLogInsertion(log: Log) {
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

export function latestLogFromDeviceRetrieval(deviceId: string) {
    return getLatestLogFromDevice(deviceId).then((log: LogDTO | null) => {
        if (log !== null)
            return log.toModel()
        else
            return log
    });
}

export function lastMonthLogFromDeviceRetrieval(deviceId: string) {
    return retrieveLastMonthLogsFromDevice(deviceId).then((logsFound: Array<LogDTO>) => {
        let logs: Array<Log> = [];
        logsFound.forEach((log: LogDTO) => logs.push(log.toModel()));
        return logs;
    })
}