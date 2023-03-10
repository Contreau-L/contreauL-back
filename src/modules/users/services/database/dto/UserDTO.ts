import User from "../../domain/models/User";

class UserDTO {
    id?: string;
    user_name: string;
    password: string
    email: string;

    constructor(id: string, user_name: string, password:string, email: string) {
        this.id = id;
        this.user_name = user_name;
        this.password = password;
        this.email = email;
    }

    fromModel(model: User) {
        return new UserDTO(model.id, model.name, model.password, model.email)
    }
}

export default UserDTO;