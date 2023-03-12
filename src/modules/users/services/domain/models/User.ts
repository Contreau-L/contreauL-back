import UserDTO from "../../database/dto/UserDTO";

class User {
    name: string;
    password: string;
    email: string;
    id?: string;


    constructor(name: string, password: string, email: string, id?: string) {
        this.password = password;
        this.email = email;
        this.name = name;
        this.id = id;
    }

    public static fromDTO(dto: UserDTO) {
        return new User(dto.user_name, dto.password, dto.email, dto.id);
    }

    public static convertFromBody(body: any) {
        return new User(body.name, body.password, body.email);
    }
}

export default User;