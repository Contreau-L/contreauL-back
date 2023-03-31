import GardenLine from "../../domain/model/GardenLine";

class GardenLineDTO {
    device: string;
    vegetable_type: string;
    humidity_threshold: number;
    line_index: number;
    id?: string;

    constructor(device: string, vegetable_type: string, humidity_threshold: number, line_index: number, id?: string) {
        this.device = device;
        this.vegetable_type = vegetable_type;
        this.humidity_threshold = humidity_threshold;
        this.line_index = line_index;
        this.id = id;
    }

    toModel(){
        return new GardenLine(
            this.device,
            this.vegetable_type,
            this.humidity_threshold,
            this.line_index,
            this.id
        )
    }

    toQueryParam() {
        return [this.device, this.vegetable_type, this.humidity_threshold, this.line_index];
    }

    static fromRow(row: any) {
        return new GardenLineDTO(
            row.device,
            row.vegetable_type,
            row.humidity_threshold,
            row.line_index,
            row.id
        )
    }
}

export default GardenLineDTO;