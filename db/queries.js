const pool = require("./pool");

async function getAllMessagesWithNameArray() {
  const { rows } = await pool.query(
    "SELECT * FROM users JOIN messages ON messages.user_id = users.id;"
  );
  return rows;
}

async function insertUser(username, fullname, password) {
  await pool.query(
    `INSERT INTO
    users (username, fullname, password)
    VALUES ($1, $2, $3);`,
    [username, fullname, password]
  );
}

module.exports = { getAllMessagesWithNameArray, insertUser };
