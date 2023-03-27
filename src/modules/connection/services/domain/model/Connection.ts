import ConnectionDTO from "../../database/dto/ConnectionDTO";

class Connection {
    device: string;
    occurredAt: Date;
    id?: string;

    constructor(device: string, occurredAt: Date, id?: string) {
        this.device = device;
        this.occurredAt = occurredAt;
        this.id = id;
    }

    toDTO() {
        return new ConnectionDTO(
            this.device,
            this.occurredAt,
            this.id
        )
    }


}

export default Connection;