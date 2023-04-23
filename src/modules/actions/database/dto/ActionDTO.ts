import Action, {ActionStatus, ActionTypes} from "../../domain/model/Action";

class ActionDTO {
    device: string;
    garden_line: string;
    type: ActionTypes;
    status: ActionStatus;
    requested_at: Date;
    occurred_at?: Date;
    id?: string;


    constructor(device: string, garden_line: string, type: ActionTypes, status: ActionStatus, requested_at: Date, occurred_at?: Date, id?: string) {
        this.device = device;
        this.garden_line = garden_line;
        this.type = type;
        this.status = status;
        this.requested_at = requested_at;
        this.occurred_at = occurred_at;
        this.id = id;
    }

    toModel() {
        return new Action(
            this.device,
            this.garden_line,
            this.type,
            this.status,
            this.requested_at,
            this.occurred_at,
            this.id
        )
    }

    static fromRow(row: any) {
        return new ActionDTO(
            row.device,
            row.garden_line,
            row.type,
            row.status,
            row.requested_at,
            row.occurred_at,
            row.id
        )
    }
}

export default ActionDTO;