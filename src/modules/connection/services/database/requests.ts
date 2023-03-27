export function getConnectionHistoryCreationRequest() {
    return `INSERT INTO "connection_history" (device, occurred_at) VALUES ($1, NOW())`
}