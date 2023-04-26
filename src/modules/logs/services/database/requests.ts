export const getLogCreationRequest = (): string => {
    return `INSERT INTO "logs" (device, water_temperature, water_level, occurred_at, added_at, ph) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;
}

export const getLastLogsFromDeviceRequest = (): string => {
    return `SELECT * FROM "logs" WHERE "device" = $1 ORDER BY "occurred_at" DESC LIMIT 20;`
}

export const getLatestLogFromDeviceRequest = (): string => {
    return `SELECT * FROM "logs" WHERE "device" = $1 ORDER BY "occurred_at" DESC LIMIT 1;`
}