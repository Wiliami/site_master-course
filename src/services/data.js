import pool from '../config/database.js'

/** CREATE
 * @param {String} table Nome da tabela no formato {String} 
 * @param {Object} data - Dados para serem passados como segundo parâmetro da função do tipo {objeto}
 * @param {value1} data.property1 Você pode passar várias propriedades para o objeto para serem enviados para o banco
 * @param {value2} data.property2 Inserir a segunda propriedade se caso for necessário e se assim por diante
*/
export const create = async (table, data) => {
    try {

        const columns = Object.keys(data)
        const values = Object.values(data)
        const placeholders = columns.map((_, index) => `$${index + 1}`)


        const query = `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders.join(', ')}) RETURNING *`;

        console.log(`Query: ${query}`)
        console.log(`Values: ${values}`)

        const res = await pool.query(query, values)
        if(res.rowCount > 0) {
          console.log('Item inserido com sucesso:', res.rows[0])
        } else {
          console.log('Nenhum item foi inserido')
        }  
    } catch (error) {
        console.error('Erro ao inserir item na tabela:', error)
    }
}


/**
 * READ
 * @param {String} table Nome da tabela no banco de dados em formato string
 */
export const read = async (table) => {
    const query = `SELECT * FROM ${table}`

    try {
        const result = await pool.query(query)
        return result.rows

    } catch (error) {
        console.error('Erro ao buscar itens:', error)
        throw error
    }
}


/**
 * UPDATE
 * @param {String} 
 */
export const update = async (id, column, value) => {
  try {
    console.log('Successo')
  } catch (error) {
    console.error('Error')
  }
}


/**
 * DELETE 
 * @param {String} table Nome da tabela no banco de dados
 * @param {String} column Nome da coluna onde será aplicada a condição de exclusão
 * @param {String} value Valor que será deletado na tabela
 */
export const deleteResource = async (table, column, value) => {
  try {
    const query = `DELETE FROM ${table} WHERE ${column} = $1 RETURNING *`
    const res = await pool.query(query, [value])

    if (res.rowCount > 0 ) {
      console.log('Registro encontrado:', res.rowCount)
      console.log('Item excluído com sucesso:', res.rows[0])
    } else {
      console.log(`Nenhum item encontrado com o ${column}:`, value)
      return null
    }

  } catch (err) {
    console.error('Erro ao deletar item:', err)
    throw err
  }
};