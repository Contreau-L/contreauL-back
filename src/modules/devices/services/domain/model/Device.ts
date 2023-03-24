import DeviceDTO from "../../database/dto/DeviceDTO";

class Device {
    idMac: number;
    name: string;
    latitude: number;
    longitude: number;
    insee: number;


    constructor(idMac: number, name: string, latitude: number, longitude: number, insee: number) {
        this.idMac = idMac;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.insee = insee;
    }

    toDTO () {
        return new DeviceDTO(
            this.idMac,
            this.name,
            this.latitude,
            this.longitude,
            this.insee
        )
    }
}

export default Device;