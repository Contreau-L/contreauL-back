import UserLogin from "../../domain/models/UserLogin";

class UserLoginDTO {
    email: string;
    password: string


    constructor(email: string, password:string) {
        this.email = email;
        this.password = password;
    }

    public static fromModel(model: UserLogin) {
        return new UserLoginDTO(model.email, model.password)
    }

}


export default UserLoginDTO;