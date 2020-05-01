const mysql = require('mysql')

// getting the user input
const prompt = require('prompt-sync')({ sigint: true })


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

    // NOT NECESSARY
    Connect() {
        this.db.connect((err) => {
            if (err) throw err

            console.log('MySQL Connected!')
        })
    }

    Add(values) {
        const query = `INSERT INTO ${this.TABLE_NAME} SET ?`

        // values -> a dictionary with multiple key/values
        // -> name, adress, info, etc ...
        this.db.query(query, values, (err, res) => {
            if (err) throw new Error(err, res)

            console.log('Data successfully inserted!')
        })
    }

    // it will return ALL the query from the database
    Read() { // -> it may result in lag/performace issues

        const query = `SELECT * FROM ${this.TABLE_NAME}`

        this.db.query(query, (err, res) => {
            if (err) throw err

            /*
                - Technically, it's not this function responsability to print 
                out the query result to the console
                - But since it's such an useful, and required function
                and it does get a BIG query value, it's better for it to just print out
                the query result now, instead of passing to another function, etc ...
            */
            console.log(res)
        })
    }

    Update(id, values) {

        const updateQuery = `UPDATE ${this.TABLE_NAME} SET ? WHERE id = ${id}`

        this.db.query(updateQuery, values, (err, res) => {
            if (err) throw (err, res)

            console.log('Successfully updated the database')
        })
    }

    Remove(id) {
        const query = `DELETE FROM ${this.TABLE_NAME} WHERE id = ${id}`

        this.db.query(query, (err, res) => {
            if (err) throw err, res

            console.log('Successfully removed!')
        })
    }

    // returns a dictionary with the data condensed
    GetUserData() {
        // Full name, CPF, street info, desktop or notebook, accessories ...

        // TODO: it may need to be updated ( add more info )
        const name = prompt('Name ? ')
        const cpf = prompt('CPF ? ')
        const streetName = prompt('Street name ? ')
        const neighborhoodName = prompt('Neighborhood name ? ')
        const houseNumber = prompt('Number of your house ? ')
        const computerType = prompt('Is it a desktop or a notebook ? ')
        // COMPUTER PROBLEM -> is missing, add it later ...
        const accessories = prompt('Which accessories does it has ? ')

        console.log(name, cpf, streetName, houseNumber, neighborhoodName, computerType, accessories)

        // Passes all the info to a dictionary
        const values = {
            'name': name,
            'cpf': cpf,
            'streetName': streetName,
            'neighborhoodName': neighborhoodName,
            'houseNumber': houseNumber,
            'computerType': computerType,
            'accessories': accessories
        }

        return values
    }
}

module.exports = Database