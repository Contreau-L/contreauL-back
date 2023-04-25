import Log from "../../domain/model/Log";
import {QueryResultRow} from "pg";

class LogDTO {
    device: number;
    water_temperature: number;
    water_level: number;
    occured_at: Date;
    ph: number;
    id?: string;
    added_at?: string;


    constructor(device: number, water_temperature: number, water_level: number, occured_at: Date, ph: number, id?: string, added_at?: string) {
        this.device = device;
        this.water_temperature = water_temperature;
        this.water_level = water_level;
        this.occured_at = occured_at;
        this.ph = ph;
        this.id = id;
        this.added_at = added_at;
    }

    toQueryParam() {
        return [this.device, this.water_temperature, this.water_level, this.occured_at, new Date(), this.ph]
    }

    toModel() {
        return new Log(
            this.device,
            this.water_temperature,
            this.water_level,
            this.occured_at,
            this.ph,
            this.id,
            this.added_at
        )
    }

    static fromRow(row: QueryResultRow) {
        return new LogDTO(
            row.device,
            row.water_temperature,
            row.water_level,
            row.occurred_at,
            row.ph,
            row.id,
            row.added_at
        )
    }
}

export default LogDTO;