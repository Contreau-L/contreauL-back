import HumidityLevelDTO from "../../database/dto/HumidityLevelDTO";

class HumidityLevel {
    log: string;
    gardenLine: string;
    humidityLevel: number;
    id?: string;

    constructor(log: string, gardenLine: string, humidityLevel: number, id?: string) {
        this.log = log;
        this.gardenLine = gardenLine;
        this.humidityLevel = humidityLevel;
        this.id = id;
    }

    toDTO() {
        return new HumidityLevelDTO(
            this.log,
            this.gardenLine,
            this.humidityLevel,
            this.id
        )
    }
}

export default HumidityLevel;