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
        return new ConnectionDTO(
            this.device,
            this.occurred_at,
            this.id
        )
    }

    toQueryParam() {
        return [this.device, this.occurred_at]
    }

}

export default ConnectionDTO;