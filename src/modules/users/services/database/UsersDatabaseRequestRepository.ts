import {openConnection} from '../../../../utils/databaseConnector';
import * as request from '../database/requests'
import UserDTO from "./dto/UserDTO";
import {PoolClient} from "pg";
import * as uuid from "uuid";


export function insertNewUser(user: UserDTO): Promise<PoolClient | void> {
    return openConnection().then(client => {
        client.query( request.getUserCreationRequest(), [uuid.v4(), user.user_name, user.password, user.email], (err, res) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(res);
        });
    })
}

export function userEmailExists(email: string) {
    return openConnection().then(client => {
        client.query(request.getUserFromEmailRequest(), [email], (err, res) => {
            console.log(res);
            if (err) {
                console.error(err);
                return;
            } else {
                return res.rowCount > 0;
            }
        });
    })
}

