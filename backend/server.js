const express = require('express');
const cors = require('cors');
const conectarDB = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

let db;

conectarDB().then((conexion) => {
  db = conexion;
  console.log('Base de datos lista');
});

app.get('/productos', async (req, res) => {
  const productos = await db.all('SELECT * FROM productos');
  res.json(productos);
});

app.post('/productos', async (req, res) => {
  const { nombre, descripcion, estado, categoria, precio, fotografia } = req.body;

  const resultado = await db.run(
    'INSERT INTO productos (nombre, descripcion, estado, categoria, precio, fotografia) VALUES (?, ?, ?, ?, ?, ?)',
    [nombre, descripcion, estado, categoria, precio, fotografia]
  );

  res.json({ id: resultado.lastID, nombre, descripcion, estado, categoria, precio, fotografia });
});

app.delete('/items/:id', async (req, res) => {
  const { id } = req.params;
  await db.run('DELETE FROM productos WHERE id = ?', [id]);
  res.json({ mensaje: 'Producto eliminado' });
});

app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});