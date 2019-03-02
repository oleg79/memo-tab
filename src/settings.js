export const dbSettings = {
    dbName: 'memo-tab',
    version: '0.1',
    description: 'A database for flash cards',
    size: 1024 * 1024 * 5
  }
  
export const tableSettings = {
    tableName: 'cards',
    schema: [
      [ 'id', [ 'INTEGER', 'PRIMARY KEY', 'AUTOINCREMENT' ] ],
      [ 'front', [ 'VARCHAR(255)', 'NOT NULL' ] ],
      [ 'back', [ 'VARCHAR(255)', 'NOT NULL' ] ],
      [ 'desc', [ 'TEXT', 'DEFAULT NULL' ] ]
    ]
  }