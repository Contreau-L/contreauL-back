import {checkDeviceFromIdMacExist, insertNewDevice} from "../database/DevicesDatabaseRepository";
import Device from "./model/Device";

export function checkDeviceExistence(id: string): Promise<boolean>{
    return checkDeviceFromIdMacExist(id).then((deviceExist: boolean) => {
            return deviceExist
    });
}

export function newDeviceInsertion(device: Device): Promise<any> {
    return insertNewDevice(device.toDTO());
}