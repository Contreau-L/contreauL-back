import {openConnection} from "../../../../utils/databaseConnector";
import {PoolClient, QueryResult} from "pg";
import {getDeviceCreationRequest, getDeviceFromIdRequest} from "./requests";
import DeviceDTO from "./dto/DeviceDTO";

export function checkDeviceFromIdMacExist(idMac: number): Promise<boolean | void> {
    return openConnection().then((client: PoolClient) =>
        client.query(getDeviceFromIdRequest(), [idMac])
            .then((result: QueryResult) => result.rowCount === 1)
            .catch((error) => console.error(error))
            .finally(() => client.release())
    )
}

export function insertNewDevice(device: DeviceDTO): Promise<any> {
    return openConnection().then((client: PoolClient) =>
        client.query(getDeviceCreationRequest(), device.toQueryParam())
            .catch((error) => console.error(error))
            .finally(() => client.release())
    )
}

