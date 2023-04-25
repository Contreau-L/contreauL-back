import {openConnection} from '../../../../utils/databaseConnector';
import UserDTO from "./dto/UserDTO";
import {PoolClient, QueryResult} from "pg";
import {
    getUserCreationRequest,
    getUserFromEmailRequest, getUserFromIdRequest,
    getUserPasswordFromEmailRequest
} from "./requests";
import userDTO from "./dto/UserDTO";
import UserLoginDTO from "./dto/UserLoginDTO";
import {checkPassword, hashPassword} from "../../../../utils/passwordHasher";


export function insertNewUser(user: UserDTO): Promise<userDTO | void> {
    return openConnection().then(client =>
        hashPassword(user.password).then((hash: string) =>
            client.query(getUserCreationRequest(), [user.name, hash, user.email])
                .then((result: QueryResult) => {
                    user.id = result.rows[0];
                    return user;
                })
                .catch((error) => console.error(error))
        )
    )
}

export function userEmailExist(user: UserDTO): Promise<boolean | void> {
    return openConnection().then(client =>
        client.query(getUserFromEmailRequest(), [user.email])
            .then((result: QueryResult) => result.rowCount > 0)
            .catch((error) => console.error(error))
    )
}

export function userCheckLogin(user: UserLoginDTO): Promise<UserDTO | void> {
    return openConnection().then(client =>
        client.query(getUserPasswordFromEmailRequest(), [user.email])
            .then((result: QueryResult) => {
                if (result.rowCount > 0)
                    return checkPassword(user.password, result.rows[0].password).then((check:boolean) => {
                        if (check)
                            return UserDTO.fromData(result.rows[0])
                    })
            })
            .catch((error) => console.error(error))
    )
}

export function userCheckIfExist(userId: string) {
    return openConnection().then((client: PoolClient) =>
        client.query(getUserFromIdRequest(), [userId])
            .then((result: QueryResult) => result.rows.length > 0) );
}

