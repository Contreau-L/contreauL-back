import Device from "../../domain/model/Device";

class DeviceDTO {
    id_mac: string;
    name: string;
    latitude: number;
    longitude: number;
    insee: number;


    constructor(id_mac: string, name: string, latitude: number, longitude: number, insee: number) {
        this.id_mac = id_mac;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.insee = insee;
    }

    toModel() {
        return new Device(
            this.id_mac,
            this.name,
            this.latitude,
            this.longitude,
            this.insee
        )
    }

    toQueryParam() {
        return [this.id_mac, this.name, this.latitude, this.longitude];
    }
}

export default DeviceDTO;