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

async function insertMember(user_id) {
  await pool.query(
    `INSERT INTO
      memberships (user_id)
      VALUES ($1)`,
    [user_id]
  );
}

async function isMember(user_id) {
  console.log("user_id", user_id);
  console.log("user_id", typeof user_id);
  const { rows } = await pool.query(
    "select * from memberships where user_id = ($1)",
    [user_id]
  );
  console.log("isMember rows", rows);

  if (rows.length === 0) return false;

  return true;
}

module.exports = {
  getAllMessagesWithNameArray,
  insertUser,
  insertMessage,
  insertMember,
  isMember,
};
