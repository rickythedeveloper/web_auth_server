import express from 'express';

const app = express();
const port = 8000;

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.get('/api', (req, res) => {
	const aaa = { a: 10, n: 10 };
	res.send(aaa);
});

app.listen(port, () => {
	console.log(`Server started at http://localhost:${port}`);
});
