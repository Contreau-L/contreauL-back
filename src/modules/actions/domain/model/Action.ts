import ActionDTO from "../../database/dto/ActionDTO";

class Action {
    device: string;
    gardenLine: string;
    type: ActionTypes;
    status: ActionStatus;
    requestedAt: Date;
    occuredAt?: Date;
    id?: string;


    constructor(device: string, gardenLine: string, type: ActionTypes, status: ActionStatus, requestedAt: Date, occuredAt?: Date, id?: string) {
        this.device = device;
        this.gardenLine = gardenLine;
        this.type = type;
        this.status = status;
        this.requestedAt = requestedAt;
        this.occuredAt = occuredAt;
        this.id = id;
    }

    toDTO() {
        return new ActionDTO(
            this.device,
            this.gardenLine,
            this.type,
            this.status,
            this.requestedAt,
            this.occuredAt,
            this.id
        )
    }
}

export default Action;

export enum ActionTypes {
    MANUAL = "MANUAL",
    AUTOMATIC = "AUTOMATIC"
}

export enum ActionStatus {
    DONE = "DONE",
    WAITING = "WAITING",
    ERROR = "ERROR"
}