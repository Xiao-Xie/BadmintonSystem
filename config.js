module.exports = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '312312',
  database: process.env.DB_DATABASE || 'newbee',
  datapoint: process.env.DATA_POINT || 'http://localhost:9000/',
};
