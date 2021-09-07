import { Request, Response } from 'express';
import * as core from 'express-serve-static-core';
import { Pool, QueryResult } from 'pg';

const USER_ACCOUNTS_TABLE = 'user_accounts';

const pool = new Pool({
	user: 'client',
	password: 'password',
	host: 'localhost',
	database: 'authentication',
	port: 5432,
});

// export const getUsers = (request: Request, response: Response) => {
// 	pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
// 		if (error) {
// 			throw error;
// 		}
// 		response.status(200).json(results.rows);
// 	});
// };

// interface GetUserByIDParams {
// 	id: string;
// }
// export const getUserByID = (request: Request<GetUserByIDParams>, response: Response) => {
// 	const id = parseInt(request.params.id);
// 	pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
// 		if (error) {
// 			throw error;
// 		}
// 		response.status(200).json(results.rows);
// 	});
// };

interface NewUser {
	username: string;
	password: string;
}
export const createUser = (request: Request<core.ParamsDictionary, any, NewUser>, response: Response) => {
	const { username, password } = request.body;

	// TODO: check the username does not relady exist
	// TODO: generate salt
	const salt = 'salthere';
	// TODO: generate hash
	const passwordHash = password;
	pool.query(
		`INSERT INTO ${USER_ACCOUNTS_TABLE} (username, password_hash, password_salt) VALUES ($1, $2, $3)`,
		[username, passwordHash, salt],
		(error: Error, results: QueryResult<any>) => {
			if (error) throw error;
			response.status(200).send(`Added a user with username ${username}`);
		},
	);
};

// export const updateUser = (request: Request<{ id: string }>, response: Response) => {
// 	const id = parseInt(request.params.id);
// 	const { name, email } = request.body;

// 	pool.query(
// 		'UPDATE users SET name = $1, email = $2 WHERE id = $3',
// 		[name, email, id],
// 		(error, results) => {
// 			if (error) {
// 				throw error;
// 			}
// 			response.status(200).send(`User modified with ID: ${id}`);
// 		},
// 	);
// };

// export const deleteUser = (request: Request<{ id: string }>, response: Response) => {
// 	const id = parseInt(request.params.id);

// 	pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
// 		if (error) {
// 			throw error;
// 		}
// 		response.status(200).send(`User deleted with ID: ${id}`);
// 	});
// };
