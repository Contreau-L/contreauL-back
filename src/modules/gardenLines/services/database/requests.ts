export function getGardenLineCreationRequest(){
    return `INSERT INTO "garden_lines" (device, vegetable_type, humidity_threshold, line_index, status) VALUES ($1, $2, $3, $4, $5)`;
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

export function getGardenLineFromIdRequest(){
    return `SELECT * FROM "garden_lines" WHERE "id" = $1`;
}

export function getGardenLineStatusUpdateFromIdRequest() {
    return `UPDATE "garden_lines" SET ("status") = (row($1)) WHERE "id" = $2;`
}

export function getGardenLinesInformationsUpdateFromIdRequest() {
    return `UPDATE "garden_lines" SET ("vegetable_type", "humidity_threshold") = ($1, $2) WHERE "id" = $3;`
}

