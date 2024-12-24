import pkg from 'pg';
const { Pool } = pkg;

const poolConfig = {
  max: 5,
  min: 2,
  idleTimeoutMillis: 600000,
}

const DataBase = "postgres"
const UserName = "postgres"
const Password = "password"

poolConfig.connectionString = `postgres://${UserName}:${Password}@127.0.0.1:5432/${DataBase}`;

const pool = new Pool(poolConfig)

export async function listPhonebook(phone) {
  try {
    const result = await pool.query('SELECT * FROM phonebook');
    return result.rows;
  } catch (err) {
    console.error('Error executing query:', err.stack);
  }
  // finally {
  //   await pool.end(); // Close the pool when all operations are complete
  // }
}

export async function newPhoneInDb(firstName, lastName, phone) {

  const query = `
    INSERT INTO phonebook (first_name, last_name, phone)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  const values = [firstName, lastName, phone];

  try {
    const result = await pool.query(query, values);
    console.log('Query results:', result.rows[0]);
    return ('Sucess')
  } catch (err) {
    console.error('Error executing query:', err.stack);
    return ('Sucess')
  }
  // finally {
  //   await pool.end(); // Close the pool when all operations are complete
  // }
}

export async function updateUserInDb(firstName, lastName, phone, id) {

  const query = `
    UPDATE phonebook
    SET first_name = $1, last_name = $2, phone = $3
    WHERE id = $4
    RETURNING *;
  `;

  const values = [firstName, lastName, phone, id];

  try {
    const result = await pool.query(query, values);
    return ('Sucess')
  } catch (err) {
    console.error('Error executing query:', err.stack);
    return ('Error')
  }
  // finally {
  //   await pool.end(); // Close the pool when all operations are complete
  // }
}


export async function deleteUserById(id) {

  const query = 'DELETE FROM phonebook WHERE id = $1 RETURNING *';
  const values = [id];

  try {
    await pool.query(query, values);
    return ('Sucess')
  } catch (err) {
    console.error('Error executing query:', err.stack);
    return ('Error')
  }
  // finally {
  //   await pool.end(); // Close the pool when all operations are complete
  // }
}

export async function getUserByID(id) {
  try {
    const result = await pool.query('SELECT * FROM phonebook WHERE id = $1', [id]);
    return (result)
  } catch (err) {
    console.error('Error executing query:', err.stack);
    return ('Sucess')
  }
  // finally {
  //   await pool.end(); // Close the pool when all operations are complete
  // }
}





