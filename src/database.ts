const sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')
const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
      console.log(err)
      throw err
  } else {
    console.log('Connected to SQLite database.')
  }
  
});

module.exports = db