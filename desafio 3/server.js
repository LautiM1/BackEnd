
const express = require('express');
const Contenedor = require('./container.js');

const product = new Contenedor('./productos.txt');

const app = express();

app.get('/', (req, res) => {
	res.send(`<h1 style= "color:black">Bienvenidos a D-SHIRT</h1>`);
});

app.get('/productos', async (req, res) => {
	const getProductos = await product.getAll();
	res.send(getProductos);
});

app.get('/producto-random', async (req, res) => {
	const getProduct = await product.getAll();
	const productRandom =
		getProduct[Math.floor(Math.random() * getProduct.length)];
	res.send(productRandom);
});

app.listen(8080, () => {
	console.log(
		`servidor ejecutado en el puerto 8080 ${'http://localhost:8080/'}`
	);
});