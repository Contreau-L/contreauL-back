import {QueryResultRow} from "pg";
import Connection from "../../domain/model/Connection";

class ConnectionDTO {
    device:string;
    occurred_at: Date;
    id?: string;

    constructor(device: string, occurred_at: Date, id?: string) {
        this.device = device;
        this.occurred_at = occurred_at;
        this.id = id;
    }

    toModel() {
        return new Connection(
            this.device,
            this.occurred_at,
            this.id
        )
    }

    toQueryParam() {
        return [this.device, this.occurred_at]
    }

    static fromRow(row: QueryResultRow) {
        return new ConnectionDTO(
            row.device,
            row.occurred_at,
            row.id
        )
    }

}

export default ConnectionDTO;