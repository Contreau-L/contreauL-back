export function insertManualActionRequest() {
    return `INSERT INTO "actions" ("device", "garden_line", "type", "status", "requested_at") VALUES ($1, $2, 'MANUAL', 'WAITING', $3);`
}

export function insertAutomaticActionRequest() {
    return `INSERT INTO "actions" ("device", "garden_line", "type", "status", "requested_at") VALUES ($1, $2, 'AUTOMATIC', 'WAITING', $3);`
}

export function updateActionStatusToDoneRequest() {
    return `UPDATE "actions" SET ("status", "occurred_at") = ('DONE', $1) WHERE "device" = $2 AND "garden_line" = $3 AND "status" = 'WAITING';`
}

export function updateActionStatusToErrorRequest() {
    return `UPDATE "actions" SET ("status", "occurred_at") = ('ERROR', $1) WHERE "device" = $2 AND "garden_line" = $3 AND "status" = 'WAITING';`
}

export function getWaitingActionsForLineRequest() {
    return `SELECT * FROM "actions" WHERE "garden_line" = $1 AND "status" = 'WAITING';`;
}

export function getUpdateWaitingActionTypeToManualRequest() {
    return `UPDATE "actions" SET ("type", "requested_at") = ('MANUAL', $1) WHERE "device" = $2 AND "garden_line" = $3 AND "status" = 'WAITING';`
}

export function getWaitingActionsFromDeviceRequest () {
    return `SELECT * FROM "actions" WHERE "device" = $1 AND "status" = 'WAITING';`
}

export function getAllActionsFromDeviceRequest () {
    return `SELECT * FROM "actions" WHERE "device" = $1;`
}

export function getLastActionsFromDeviceRequest () {
    return `SELECT * FROM "actions" WHERE "device" = $1 ORDER BY "requested_at" DESC LIMIT 20;`
}