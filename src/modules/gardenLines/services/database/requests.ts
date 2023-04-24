export function getGardenLineCreationRequest(){
    return `INSERT INTO "garden_lines" (device, vegetable_type, humidity_threshold, line_index) VALUES ($1, $2, $3, $4)`;
}

export function getGardenLineListFromDeviceSelectionRequest(){
    return `SELECT * FROM "garden_lines" WHERE device = $1 ORDER BY line_index`;
}

export function getHumidityTresholdListFromDeviceRequest(){
    return `SELECT humidity_threshold FROM "garden_lines" WHERE device = $1 ORDER BY line_index`;
}

export function getHumidityTresholdFromGardenLineRequest(){
    return `SELECT * FROM "garden_lines" WHERE id = $1`;
}

export function getGardenLineFromDeviceAndLineIndexRequest(){
    return `SELECT * FROM "garden_lines" WHERE "device" = $1 AND "line_index" = $2`;
}