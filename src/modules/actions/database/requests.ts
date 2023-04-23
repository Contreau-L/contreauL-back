export function insertManualActionRequest() {
    return `INSERT INTO "actions" ("device", "garden_line", "type", "status", "requested_at") VALUES ($1, $2, 'MANUAL', 'WAITING', $3);`
}

export function insertAutomaticActionRequest() {
    return `INSERT INTO "actions" ("device", "garden_line", "type", "status", "requested_at") VALUES ($1, $2, 'AUTOMATIC', 'WAITING', $3);`
}

export function updateActionStatusToDoneRequest() {
    return `UPDATE "actions" SET ("status", "occurred_at") = ('DONE', $1) WHERE "id" = $2;`
}

export function updateActionStatusToErrorRequest() {
    return `UPDATE "actions" SET ("status", "occurred_at") = ('ERROR', $1) WHERE "id" = $2;`
}

export function getWaitingActionsFromDeviceRequest () {
    return `SELECT * FROM "actions" WHERE "device" = $1 AND "status" = 'WAITING';`
}

export function getAllActionsFromDeviceRequest () {
    return `SELECT * FROM "actions" WHERE "device" = $1;`
}