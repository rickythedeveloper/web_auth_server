import express from 'express';
import bodyParser from 'body-parser';
import * as db from './database';

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (request, response) => {
	response.json({ info: 'Hiii' });
});
// app.get('/users', db.getUsers);
// app.get('/users/:id', db.getUserByID);

// You can use the following to test adding a user.
// curl --data "username=Ricky&password=123445" http://localhost:8000/users
app.post('/users', db.createUser);

// app.put('/users/:id', db.updateUser);
// app.delete('/users/:id', db.deleteUser);

app.get('/api', (req, res) => {
	const aaa = { a: 10, n: 10 };
	res.send(aaa);
});

app.listen(port, () => {
	console.log(`Server started at http://localhost:${port}`);
});
