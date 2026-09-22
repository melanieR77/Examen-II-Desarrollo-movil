const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

async function conectarDB() {
  const db = await open({
    filename: './productos.db',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS productos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT,
      descripcion TEXT,
      estado TEXT,
      categoria TEXT,
      precio REAL,
      fotografia TEXT
    )
  `);

  return db;
}

module.exports = conectarDB;