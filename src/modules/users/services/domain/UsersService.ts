import User from "./models/User";
import {
    insertNewUser,
    userCheckIfExist,
    userCheckLogin,
    userEmailExist
} from "../database/UsersDatabaseRequestRepository";
import UserDTO from "../database/dto/UserDTO";
import UserLogin from "./models/UserLogin";
import UserLoginDTO from "../database/dto/UserLoginDTO";

export function newUserInsertion(user: User): Promise<User | undefined> {
    return insertNewUser(UserDTO.fromModel(user)).then((newUser: UserDTO | void) => {
        if (newUser)
            return User.fromDTO(newUser);
    });
}

export function checkEmailExistence(user: User): Promise<boolean | undefined>{
    return userEmailExist(UserDTO.fromModel(user)).then((emailExistence: boolean | void) => {
        if (typeof emailExistence === "boolean")
            return emailExistence
    });
}

export function retrieveUserForLogin(user: UserLogin): Promise<User | undefined> {
    return userCheckLogin(UserLoginDTO.fromModel(user)).then((userRetrieved: UserDTO | null | void) => {
        if (userRetrieved)
            return User.fromDTO(userRetrieved);
    })
}

export function checkUserExistence(userId: string) {
    return userCheckIfExist(userId);
}