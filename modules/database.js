const mysql = require('mysql')

class Database {
    constructor() {

        this.DATABASE_NAME = 'businessSystem'
        this.TABLE_NAME = 'clients'

        this.db = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: this.DATABASE_NAME
        })
    }

    Connect() {
        this.db.connect((err) => {
            if (err) throw err

            console.log('MySQL Connected!')
        })
    }

    // values will be a dictionary with multiple key/values
    Add(values) {
        const query = `INSERT INTO ${this.TABLE_NAME} SET ?`

        this.db.query(query, values, (err, res) => {
            if (err) throw new Error(err, res)

            console.log('Data successfully inserted!')
        })
    }
}

module.exports = Database