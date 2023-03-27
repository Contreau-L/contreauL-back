export const getLogCreationRequest = (): string => {
    return `INSERT INTO "logs" (device, water_temperature, water_level, occurred_at, added_at, ph) VALUES ($1, $2, $3, $4, NOW(), $5) RETURNING id`;
}