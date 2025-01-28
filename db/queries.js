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

async function insertMessage(user_id, title, message_text) {
  const currentDate = new Date();
  const formattedDate = currentDate
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  await pool.query(
    `INSERT INTO 
      messages (user_id, title, message_text, timestamp)
      VALUES ($1, $2, $3, $4);`,
    [user_id, title, message_text, formattedDate]
  );
}

module.exports = { getAllMessagesWithNameArray, insertUser, insertMessage };
