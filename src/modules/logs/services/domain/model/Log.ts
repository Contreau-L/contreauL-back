import LogDTO from "../../database/dto/LogDTO";

class Log {
    device: number;
    waterTemperature: number;
    waterLevel: number;
    occuredAt: Date;
    ph: number;
    id?: string;
    addedAt?: string;


    constructor(device: number, waterTemperature: number, waterLevel: number, occuredAt: Date, ph: number, id?: string, addedAt?: string) {
        this.device = device;
        this.waterTemperature = waterTemperature;
        this.waterLevel = waterLevel;
        this.occuredAt = occuredAt;
        this.ph = ph;
        this.id = id;
        this.addedAt = addedAt;
    }

    toDTO () {
        return new LogDTO(
            this.device,
            this.waterTemperature,
            this.waterLevel,
            this.occuredAt,
            this.ph,
            this.id,
            this.addedAt
        )
    }

    static fromBody (body: any) {
        return new Log(
            body.device,
            body.water_temperature,
            body.water_level,
            body.occured_at,
            body.ph
        )
    }
}

export default Log;