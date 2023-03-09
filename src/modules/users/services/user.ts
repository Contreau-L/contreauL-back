import * as db from '../../../utils/databaseConnector.ts';

export function insertNewUser(user) {
    const query = "INSERT INTO users (user_name, password, email) VALUES ($1, $2, $3)";
    return db.getClient().query( query, [user.name, user.password, user.email], (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(res);
    });
}

export function userEmailExists(email) {
    const query = "SELECT * FROM users WHERE email = $1";
    return db.getClient().query( query, [email], (err, res) => {
        console.log(res);
        if (err) {
            console.error(err);
            return;
        } else {
            return res.rowCount > 0;
        }
    });
}

