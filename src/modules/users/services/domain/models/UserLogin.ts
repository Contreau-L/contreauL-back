import UserLoginDTO from "../../database/dto/UserLoginDTO";

class UserLogin {
    email: string;

    password: string;

    constructor( email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    fromDTO(dto: UserLoginDTO) {
        return new UserLogin( dto.email, dto.password);
    }

    public static convertFromBody(body: any) {
        return new UserLogin(body.email, body.password);
    }
}

export default UserLogin;