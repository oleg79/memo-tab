import { useEffect, useReducer } from 'react'

const initialState = {
    cards: []
  }
  
  const INIT = 'INIT'
  const INSERT = 'INSERT'
  const UPDATE = 'UPDATE'
  const DELETE = 'DELETE'
  
  const reducer = (state, action) => {
    switch (action.type) {
      case INIT:
        return { cards: action.payload }
      case INSERT:
        return { cards: [...state.cards, action.payload] }
      case UPDATE:
        return state
      case DELETE:
        return { cards: state.cards.filter(({ id }) => id !== action.payload) }
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
  
  const useWebSQL = ({ dbName, version, description, size }, { tableName, schema }, initData = []) => {
    const [state, dispatch] = useReducer(reducer, initialState)
  
    useEffect(() => {
      const mydb = openDatabase(dbName, version, description, size)
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
  
    return [state, dispatch];
  }

  export default useWebSQL
