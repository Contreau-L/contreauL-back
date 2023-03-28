import HumidityLevel from "../../domain/model/HumidityLevel";

class HumidityLevelDTO {
    log: string;
    garden_line: string;
    humidity_level: number;
    id?: string;

    constructor(log: string, garden_line: string, humidity_level: number, id?: string) {
        this.log = log;
        this.garden_line = garden_line;
        this.humidity_level = humidity_level;
        this.id = id;
    }

    toModel() {
        return new HumidityLevel(
            this.log,
            this.garden_line,
            this.humidity_level,
            this.id
        )
    }

    toQueryParam(){
        return [this.log, this.garden_line, this.humidity_level]
    }
}

export default HumidityLevelDTO;