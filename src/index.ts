import express from 'express';
const app = express();
import  * as db from './utils/databaseConnector.js';
import * as user from './modules/users/user.js';

db.connectToDb();

app.get('/', (req, res) => {
    res.status(200).json({ answer: 'Hello world !' });
})

app.use(express.json());

app.use('/user', user.user());

app.listen(8080, () => {
    console.log('Server started on port 8080');
});
