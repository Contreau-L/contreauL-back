import UserDTO from "../../database/dto/UserDTO";

class User {
    id: string;
    name: string;
    password: string;
    email: string;

    constructor(id: string, name: string, password: string, email: string) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.email = email;
    }

    fromDTO(dto: UserDTO) {
        return new User(dto.id, dto.user_name, dto.password, dto.email);
    }
}

export default User;