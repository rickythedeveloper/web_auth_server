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

app.post('/signin', async (request, response) => {
	const { username, password } = request.body;

	try {
		const isSuccessful = await db.loginIsSuccessful(username, password);
		if (isSuccessful) {
			// response.status(200).send('')
			response.send(`Signed in with username ${username}`);
		} else {
			response.send('Could not sign in');
		}
	} catch (error) {
		console.log(error);
	}
});

// app.put('/users/:id', db.updateUser);
// app.delete('/users/:id', db.deleteUser);

app.get('/api', (req, res) => {
	// db.loginIsSuccessful('user1', 'password1').then(isMatched => console.log(isMatched));
	// console.log(db.loginIsSuccessful('Ricky', 'haha'));
});

app.listen(port, () => {
	console.log(`Server started at http://localhost:${port}`);
});
