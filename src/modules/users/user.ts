import express from 'express';
import {userEmailExists} from "./services/database/UsersDatabaseRequestRepository";

const router = express.Router();

router.get('/user', (req, res) => {
    res.json([{name: 'John', age: 30}, {name: 'Mike', age: 25}]);
});

router.post('/', (req, res) => {
    const user = {name: req.body.name, email: req.body.email, password: req.body.password};
    userEmailExists(user.email).then((exist: boolean | undefined) => {
        if (!exist) {
            userDB.insertNewUser(user).then(() => {
                return res.status(200).json({message: 'User created !'});
            });
        } else {
            return res.status(400).json({error: 'User already exists !'});
        }
    });
});

export default router;
