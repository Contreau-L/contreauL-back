import Log from "./model/Log";
import {insertNewLog} from "../database/LogsDatabaseRequestRepository";
import LogDTO from "../database/dto/LogDTO";

export function newLogInsertion (log: Log) {
    return insertNewLog(log.toDTO()).then((newLog: LogDTO | void) => {
        if (newLog) {
            return newLog.toModel();
        }
    })
}