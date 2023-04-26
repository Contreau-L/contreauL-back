export function getConnectionHistoryCreationRequest() {
    return `INSERT INTO "connection_history" (device, occurred_at) VALUES ($1, $2);`
}

export function getLastConnectionFromDeviceIdRequest() {
    return `SELECT * FROM "connection_history" WHERE "device" = $1 ORDER BY "occurred_at" DESC LIMIT 1;`
}