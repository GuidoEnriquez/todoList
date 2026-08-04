import app from './app.js';
import env from './config/env.js';
import sequelize from './config/database.js';

async function start() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a PostgreSQL establecida correctamente');

    app.listen(env.PORT, () => {
      console.log(`Servidor ejecutándose en http://localhost:${env.PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error.message);
    process.exit(1);
  }
}

start();