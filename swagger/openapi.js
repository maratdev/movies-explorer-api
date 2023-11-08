const {
  NODE_ENV,
  PRODUCTION_SERVER,
} = process.env;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Movie Explorer',
      version: '0.1.0',
      description:
        'Это простое приложение CRUD API, созданное с помощью Express и документированное с помощью Swagger.',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'GitHub',
        url: 'https://github.com/maratdev/movies-explorer-api',
        email: 'voredev@gmail.com',
      },
    },
    servers: [
      {
        url: NODE_ENV === 'production' ? PRODUCTION_SERVER : 'http://localhost:3000/',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

module.exports = options;
