import GardenLine from "../../domain/model/GardenLine";

class GardenLineDTO {
    device: string;
    vegetable_type: string;
    humidity_threshold: number;
    line_index: number;
    status: boolean;
    id?: string;

    constructor(device: string, vegetable_type: string, humidity_threshold: number, line_index: number, status: boolean, id?: string) {
        this.device = device;
        this.vegetable_type = vegetable_type;
        this.humidity_threshold = humidity_threshold;
        this.line_index = line_index;
        this.status = status;
        this.id = id;
    }

    toModel(){
        return new GardenLine(
            this.device,
            this.vegetable_type,
            this.humidity_threshold,
            this.line_index,
            this.status,
            this.id
        )
    }

    toQueryParam() {
        return [this.device, this.vegetable_type, this.humidity_threshold, this.line_index, this.status];
    }

    static fromRow(row: any) {
        return new GardenLineDTO(
            row.device,
            row.vegetable_type,
            row.humidity_threshold,
            row.line_index,
            row.status,
            row.id
        )
    }
}

export default GardenLineDTO;