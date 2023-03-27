export function getGardenLineCreationRequest(){
    return `INSERT INTO "garden_lines" (device, vegetable_type, humidity_threshold, line_index) VALUES ($1, $2, $3, $4)`;
}