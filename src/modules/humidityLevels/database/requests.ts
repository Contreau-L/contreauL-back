export function getHumidityLevelCreationRequest() {
    return `INSERT INTO "humidity_levels" (log , garden_line , humidity_level) VALUES ($1,$2,$3)`;
}

export function getRetrieveHumidityLevelFromLogAndLineRequest() {
    return `SELECT * FROM "humidity_levels" WHERE "log" = $1 AND "garden_line" = $2;`
}