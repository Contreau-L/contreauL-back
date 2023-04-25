import GardenLineDTO from "../../database/dto/GardenLineDTO";

class GardenLine {
    device: string;
    vegetableType: string;
    humidityThreshold: number;
    lineIndex: number;
    status: boolean;
    id?: string;

    constructor(device: string, vegetableType: string, humidityThreshold: number, lineIndex: number, status: boolean, id?: string) {
        this.device = device;
        this.vegetableType = vegetableType;
        this.humidityThreshold = humidityThreshold;
        this.lineIndex = lineIndex;
        this.status = status;
        this.id = id;
    }

    toDTO(){
        return new GardenLineDTO(
            this.device,
            this.vegetableType,
            this.humidityThreshold,
            this.lineIndex,
            this.status,
            this.id
        );
    }
}

export default GardenLine;