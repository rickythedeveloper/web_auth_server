import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { Pool } from 'pg';

const app = express();
const port = 8000;

const pool = new Pool({
	user: 'me',
	host: 'localhost',
	database: 'api',
	password: 'password',
	port: 5432,
});

const getUsers = (request: Request, response: Response) => {
	pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).json(results.rows);
	});
};

interface GetUserByIDParams {
	id: string;
}
const getUserByID = (request: Request<GetUserByIDParams>, response: Response) => {
	const id = parseInt(request.params.id);
	pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).json(results.rows);
	});
};
const createUser = (request: Request, response: Response) => {
	const { name, email } = request.body;

	pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results: any) => {
		if (error) {
			throw error;
		}
		response.status(201).send(`User added with ID: ${results.insertId}`);
	});
};

const updateUser = (request: Request<{ id: string }>, response: Response) => {
	const id = parseInt(request.params.id);
	const { name, email } = request.body;

	pool.query(
		'UPDATE users SET name = $1, email = $2 WHERE id = $3',
		[name, email, id],
		(error, results) => {
			if (error) {
				throw error;
			}
			response.status(200).send(`User modified with ID: ${id}`);
		},
	);
};

const deleteUser = (request: Request<{ id: string }>, response: Response) => {
	const id = parseInt(request.params.id);

	pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).send(`User deleted with ID: ${id}`);
	});
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (request, response) => {
	response.json({ info: 'Hiii' });
});
app.get('/users', getUsers);
app.get('/users/:id', getUserByID);
app.post('/users', createUser);
app.put('/users/:id', updateUser);
app.delete('/users/:id', deleteUser);

app.get('/api', (req, res) => {
	const aaa = { a: 10, n: 10 };
	res.send(aaa);
});

app.listen(port, () => {
	console.log(`Server started at http://localhost:${port}`);
});
