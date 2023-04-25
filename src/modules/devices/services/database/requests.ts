export function getDeviceFromIdRequest() {
    return `SELECT * FROM "devices" WHERE "id_mac" = $1;`;
}

export function getDeviceCreationRequest() {
    return `INSERT INTO "devices" ("id_mac","name","insee") VALUES ($1, $2, $3);`;
}

export function getAttachedDeviceToUserRequest() {
    return `INSERT INTO "user_devices" ("user", "device") VALUES ($1, $2);`;
}

export function getDevicesAttachedToUserRequest() {
    return `SELECT "device" FROM "user_devices" WHERE "user" = $1;`;
}

export function getDeviceByIdRequest() {
    return `SELECT * FROM "devices" WHERE "id_mac" = $1;`;
}

export function getDeviceByIdAndUserRequest() {
    return `SELECT * FROM "user_devices" WHERE "device" = $1 AND "user" = $2;`;
}