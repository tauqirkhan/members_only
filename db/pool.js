const { Pool } = require("pg");
require("dotenv").config();

const connectionString = process.env.CONNECTIONSTRING;

module.exports = new Pool({
  connectionString,
});
