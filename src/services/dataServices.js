import pool from '../config/database.js'

/** CREATE
 * @param {*} data Dados para serem passados
 */
export const create = async (name, email) => {
    try {
        const res = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email])
        console.log('Usuário criado:', res.rows[0])
    } catch (error) {
        console.error('Erro ao criar usuário:', error)
    }
}


/**
 * READ
 * @param {String} table Nome da tabela no banco de dados
 */
export const read = async (table) => {
    try {
        const res = await pool.query(`SELECT * FROM ${table}`)
        return res.rows
    } catch (error) {
        console.error('Erro ao buscar itens:', error)
    }
}


/**
 * UPDATE
 * @param {String}
 */
export const update = async () => {
  try {
    console.log('Successo')
  } catch (error) {
    console.error('Error')
  }
}


/**
 * DELETE 
 * @param {String} table Nome da tabela no banco de dados
 * @param {String} column Nome da coluna que será deletada na tabela
 * @param {String} value Valor que será deletado na tabela
 */
export const deleteItem = async (table, column, value) => {
  try {
    const query = `DELETE FROM ${table} WHERE ${column} = $1 RETURNING *`
    const res = await pool.query(query, [value])
    if (res.rowCount > 0) {
      console.log('Item exlcluído com sucesso:', res.rows[0])
    } else {
      console.log(`Nenhum item encontrado com o ${column}:`, value)
    }
  } catch (err) {
    console.error('Erro ao deletar item:', err)
  }
};

// console.log(deleteItem("users", "email", "teste@gmail.com"))