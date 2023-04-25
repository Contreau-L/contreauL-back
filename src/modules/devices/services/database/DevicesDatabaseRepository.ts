import {openConnection} from "../../../../utils/databaseConnector";
import {PoolClient, QueryResult} from "pg";
import {getDeviceCreationRequest, getDeviceFromIdRequest} from "./requests";
import DeviceDTO from "./dto/DeviceDTO";

export function checkDeviceFromIdMacExist(idMac: string): Promise<boolean> {
    return openConnection().then((client: PoolClient) =>
        client.query(getDeviceFromIdRequest(), [idMac])
            .then((result: QueryResult) => result.rowCount === 1)
    )
}

export function insertNewDevice(device: DeviceDTO): Promise<any> {
    return openConnection().then((client: PoolClient) =>
        client.query(getDeviceCreationRequest(), device.toQueryParam())
            .catch((error) => console.error(error))
    )
}

