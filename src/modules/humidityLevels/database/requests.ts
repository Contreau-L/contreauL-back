export function getHumidityLevelCreationRequest() {
    return `INSERT INTO "humidity_levels" (log , garden_line , humidity_level) VALUES ($1,$2,$3)`;
}