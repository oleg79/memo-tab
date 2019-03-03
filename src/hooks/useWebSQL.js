import { useEffect, useReducer } from 'react'

const initialState = {
  memos: []
}
  
  const INIT = 'INIT'
  const INSERT = 'INSERT'
  const UPDATE = 'UPDATE'
  const DELETE = 'DELETE'
  
  const reducer = (state, action) => {
    switch (action.type) {
      case INIT:
        return { memos: action.payload }
      case INSERT:
        return { memos: [...state.memos, action.payload] }
      case UPDATE:
        return state
      case DELETE:
        return { memos: state.memos.filter(({ id }) => id !== action.payload) }
      default:
        return state
    }
  }
  
  const generateFields = schema => {
    const chunks = schema.reduce((fields, [ name, attrs ]) => {
      fields.push(`${name} ${attrs.join(' ')}`)
      return fields
    }, [])
  
    return `(${chunks.join(', ')})`
  }
  
  const getFieldsNames = schema => schema.filter(([name, __]) => name !== 'id').map(([name, __]) => name)
  
  const generateInsertSQL = ({ tableName, schema }) => {
    const fields = getFieldsNames(schema)
  
    return `INSERT INTO ${tableName} (${fields.join(', ')}) VALUES (${fields.map(__ => '?').join(', ')})`
  }

  const getCRUD = (dispatch, db, tableName, schema) => ({
    create(payload, data) {
      db.transaction(t => {
        t.executeSql(generateInsertSQL({ tableName, schema }), data, (__, results) => {
          dispatch({ type: INSERT, payload: { ...payload, id: results.insertId } })
        })
      })
    },
    delete(payload) {
      db.transaction(t => { t.executeSql(`DELETE from ${tableName} WHERE id=?`, [payload], () => {
        dispatch({ type: DELETE, payload })
      })})
    }
  })
  
  const useWebSQL = ({ dbName, version, description, size }, { tableName, schema }, initData = []) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const mydb = openDatabase(dbName, version, description, size)

    useEffect(() => {
      const fields = generateFields(schema)
      mydb.transaction(t => {
        t.executeSql(`CREATE TABLE IF NOT EXISTS ${tableName} ${fields}`)
  
        initData.forEach(row => t.executeSql(generateInsertSQL({ tableName, schema }), row))
  
        t.executeSql(`SELECT * FROM ${tableName}`, [], (t, results) => {
          const cards = []
          for (let i = 0; i < results.rows.length; i++) {
            cards.push(results.rows.item(i))
          }
  
          dispatch({ type: INIT, payload: cards })
        })
      })
    }, [])
  
    return [state, getCRUD(dispatch, mydb, tableName, schema)];
  }

  export default useWebSQL
