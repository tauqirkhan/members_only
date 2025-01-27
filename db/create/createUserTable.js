const createUserTable = () => {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS users(
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_name VARCHAR(255) NOT NULL,
      full_name VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
  );`;

  const insertSQL = `
    INSERT INTO users(user_name, full_name, password)
    VALUES
      ('FakeUserName1', 'Dummy User1', 'doNotAuth'),
      ('FakeUserName2', 'Dummy User2', 'doNotAuth'),
      ('FakeUserName3', 'Dummy User3', 'doNotAuth');
  `;

  return { createTableSQL, insertSQL };
};

module.exports = createUserTable;
