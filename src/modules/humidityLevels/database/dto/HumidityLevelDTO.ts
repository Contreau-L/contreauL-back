import HumidityLevel from "../../domain/model/HumidityLevel";
import {QueryResultRow} from "pg";

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

    static fromRow(row: QueryResultRow) {
        return new HumidityLevelDTO(
            row.log,
            row.garden_line,
            row.humidity_level,
            row.id
        )
    }
}

export default HumidityLevelDTO;