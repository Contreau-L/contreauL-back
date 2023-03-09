import express from 'express';
import * as userDB from './services/user.js';
import { check, validationResult } from 'express-validator';
const router = express.Router();

router.get('/user', (req, res) => {
    res.json([{ name: 'John', age: 30 }, { name: 'Mike', age: 25 }]);
});

router.post('/', [
    check('name').exists(),
    check('email').exists().isEmail(),
    check('password').exists()],
    (req, res ) => {
        console.log(req.body);
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const user = { name: req.body.name, email: req.body.email, password: req.body.password };
            userDB.userEmailExists(user.email).then((exist) => {
                if (!exist) {
                    userDB.insertNewUser(user).then(() => { 
                        return res.status(201).json({ message: 'User created !' });
                    });
                } else {
                    return res.status(400).json({ error: 'User already exists !' });
                }
            });
        } else {
            return res.status(400).json({ errors: errors.array() });
        }
});

export const user = () => router;
