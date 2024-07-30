import pool from '../../config/database.js'

const getUsers = async () => {
  try {
    const res = await pool.query('SELECT * FROM users')
    console.log(res.rows)
  } catch (error) {
    console.error('Erro ao buscar usuários:', error)
  }
}

console.log(getUsers())

export default getUsers