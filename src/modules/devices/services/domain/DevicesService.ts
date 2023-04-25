import {
    attachedDeviceToUser, checkDeviceAlreadyAttachedToUser,
    checkDeviceFromIdMacExist,
    insertNewDevice, retrieveDeviceFromId,
    retrieveDevicesAttachedToUser
} from "../database/DevicesDatabaseRepository";
import Device from "./model/Device";
import DeviceDTO from "../database/dto/DeviceDTO";

export function checkDeviceExistence(id: string): Promise<boolean>{
    return checkDeviceFromIdMacExist(id).then((deviceExist: boolean) => {
            return deviceExist
    });
}

export function newDeviceInsertion(device: Device): Promise<any> {
    return insertNewDevice(device.toDTO());
}

export function deviceToUserAttachement(userId: string, deviceId: string) {
    return attachedDeviceToUser(userId, deviceId);
}

export function devicesAttachedToUserRetrieval(userId: string):Promise<Array<string>> {
    return retrieveDevicesAttachedToUser(userId);
}

export function deviceByIdRetrieval(deviceId: string): Promise<Device> {
    return retrieveDeviceFromId(deviceId).then((device: DeviceDTO) => device.toModel());
}

export function checkDeviceAttachementToUser(userId: string, deviceId: string) {
    return checkDeviceAlreadyAttachedToUser(userId, deviceId);
}