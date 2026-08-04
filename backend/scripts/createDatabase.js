import pg from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env') });

const { Client } = pg;

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = parseInt(process.env.DB_PORT, 10) || 5432;
const DB_USER = process.env.DB_USER || 'postgres';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_NAME = process.env.DB_NAME || 'todolist';

function quoteDatabaseName(name) {
  if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name)) {
    throw new Error('DB_NAME solo puede contener letras, números y guiones bajos');
  }
  return `"${name}"`;
}

async function createDatabase() {
  const client = new Client({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: 'postgres',
  });

  try {
    const quotedDatabaseName = quoteDatabaseName(DB_NAME);
    await client.connect();
    console.log('Conectado a PostgreSQL');

    const result = await client.query(
      'SELECT 1 FROM pg_database WHERE datname = $1',
      [DB_NAME]
    );

    if (result.rows.length === 0) {
      await client.query(`CREATE DATABASE ${quotedDatabaseName}`);
      console.log(`Base de datos "${DB_NAME}" creada exitosamente`);
    } else {
      console.log(`La base de datos "${DB_NAME}" ya existe`);
    }
  } catch (error) {
    console.error('Error al crear la base de datos:');
    console.error(error.message);

    if (error.code === '42501' || error.message.includes('permission')) {
      console.log();
      console.log('Solución:');
      console.log('El usuario configurado no tiene permisos para crear bases de datos.');
      console.log('Ejecuta el siguiente comando en psql como superusuario:');
      console.log(`  ALTER USER "${DB_USER}" CREATEDB;`);
      console.log();
      console.log('O crea la base de datos manualmente:');
      console.log(`CREATE DATABASE "${DB_NAME}";`);
    } else if (error.code === '28P01' || error.message.includes('password authentication')) {
      console.error('Contraseña incorrecta. Verifica DB_PASSWORD en backend/.env');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('No se pudo conectar a PostgreSQL. Verifica que el servicio esté activo.');
    }

    process.exitCode = 1;
  } finally {
    await client.end().catch((closeError) => {
      console.error('Error al cerrar la conexión con PostgreSQL:', closeError.message);
      process.exitCode = 1;
    });
  }
}

createDatabase();
