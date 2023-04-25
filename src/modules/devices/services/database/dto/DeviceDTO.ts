import Device from "../../domain/model/Device";
import {QueryResultRow} from "pg";

class DeviceDTO {
    id_mac: string;
    name: string;
    insee: number;


    constructor(id_mac: string, name: string, insee: number) {
        this.id_mac = id_mac;
        this.name = name;
        this.insee = insee;
    }

    toModel() {
        return new Device(
            this.id_mac,
            this.name,
            this.insee
        )
    }

    toQueryParam() {
        return [this.id_mac, this.name, this.insee];
    }

    static fromRow(row: QueryResultRow) {
        return new DeviceDTO(
            row.id_mac,
            row.name,
            row.insee
        )
    }
}

export default DeviceDTO;