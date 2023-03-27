import gardenLineDTO from "../../database/dto/gardenLineDTO";

class gardenLine {
    device: string;
    vegetableType: string;
    humidityThreshold: number;
    lineIndex: number;
    id?: string;

    constructor(device: string, vegetableType: string, humidityThreshold: number, lineIndex: number, id?: string) {
        this.device = device;
        this.vegetableType = vegetableType;
        this.humidityThreshold = humidityThreshold;
        this.lineIndex = lineIndex;
        this.id = id;
    }

    toDTO(){
        return new gardenLineDTO(
            this.device,
            this.vegetableType,
            this.humidityThreshold,
            this.lineIndex,
            this.id
        );
    }
}

export default gardenLine;