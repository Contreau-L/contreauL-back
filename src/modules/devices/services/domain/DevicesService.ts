import {checkDeviceFromIdMacExist, insertNewDevice} from "../database/DevicesDatabaseRepository";
import Device from "./model/Device";

export function checkDeviceExistence(id: number): Promise<boolean | undefined>{
    return checkDeviceFromIdMacExist(id).then((deviceExist: boolean | void) => {
        if (typeof deviceExist === "boolean")
            return deviceExist
    });
}

export function newDeviceInsertion(device: Device): Promise<any> {
    return insertNewDevice(device.toDTO());
}