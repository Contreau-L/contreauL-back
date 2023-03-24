export function getDeviceFromIdRequest() {
    return `SELECT * FROM "Device" WHERE "id_mac" = $1`;
}

export function getDeviceCreationRequest() {
    return `INSERT INTO "Device" ("id_mac","name","latitude","longitude") VALUES ($1, $2, $3, $4)`;
}