import DeviceDTO from "../../database/dto/DeviceDTO";

class Device {
    idMac: string;
    name: string;
    insee: number;


    constructor(idMac: string, name: string, insee: number) {
        this.idMac = idMac;
        this.name = name;
        this.insee = insee;
    }

    toDTO () {
        return new DeviceDTO(
            this.idMac,
            this.name,
            this.insee
        )
    }
}

export default Device;