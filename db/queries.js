const pool = require("./pool");

async function getAllMessagesWithNameArray() {
  const { rows } = await pool.query(
    "SELECT * FROM users JOIN messages ON messages.user_id = users.id;"
  );
  return rows;
}

module.exports = { getAllMessagesWithNameArray };
