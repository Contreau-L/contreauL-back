import User from "../../domain/models/User";
import {QueryResultRow} from "pg";

class UserDTO {
    name: string;
    password: string
    email: string;
    id?: string;


    constructor(user_name: string, password:string, email: string, id?: string,) {
        this.name = user_name;
        this.password = password;
        this.email = email;
        this.id = id;
    }

    public static fromModel(model: User) {
        return new UserDTO(model.name, model.password, model.email, model.id)
    }

    public static fromData(data: QueryResultRow) {
        return new UserDTO(data.user_name, data.password, data.email, data.id)
    }
}

export default UserDTO;