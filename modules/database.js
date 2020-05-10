const mysql = require('mysql')

// getting the user input
const prompt = require('prompt-sync')({ sigint: true })


class Database {
    constructor() {

        this.DATABASE_NAME = 'businessSystem'
        this.PRIMARY_TABLE = 'clients'
        this.SECONDARY_TABLE = 'orders'

        this.db = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: this.DATABASE_NAME
        })

        this.db.connect((err) => {
            if (err) throw err
        })
    }

    CreatePrimaryTable() {
        const query = 'CREATE TABLE clients (id int AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), cpf VARCHAR(255), streetName VARCHAR(255), houseNumber VARCHAR(255), neighborhoodName VARCHAR(255))'

        this.db.query(query, (err, res) => {
            if (err) throw new Error(err, res)

            console.log('Successfully created the table')
        })
    }

    CreateSecondaryTable() {
        const query = `CREATE TABLE orders (id int AUTO_INCREMENT PRIMARY KEY, clientID VARCHAR(255), computerType VARCHAR(255), computerProblem VARCHAR(255), accessories VARCHAR(255))`

        this.db.query(query, (err, res) => {
            if (err) throw new Error(err, res)

            console.log('Successfully created the table')
        })
    }

    // NOT NECESSARY
    Connect() {
        this.db.connect((err) => {
            if (err) throw err

            console.log('MySQL Connected!')
        })
    }

    Add(table, values) {

        const query = `INSERT INTO ${this.GetTableName(table)} SET ?`

        // values -> a dictionary with multiple key/values
        // -> name, adress, info, etc ...
        this.db.query(query, values, (err, res) => {
            if (err) throw new Error(err, res)

            console.log('Data successfully inserted!')
        })
    }

    // __ NOT USEFUL __
    // it will return ALL the query from the database
    Read(table) { // -> it may result in lag/performace issues

        const query = `SELECT * FROM ${this.GetTableName(table)}`

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

    ReadByID(table, id) {

        const query = `SELECT * FROM ${this.GetTableName(table)} WHERE id = ${id}`

        this.db.query(query, (err, res) => {
            if (err) throw (err, res)

            console.log(res)
        })
    }

    // only work on the primary database
    ReadByName(name) {

        const query = `SELECT * FROM ${this.PRIMARY_TABLE} WHERE name = '${name}'`

        this.db.query(query, (err, res) => {
            if (err) throw (err, res)

            console.log(res)
        })
    }

    // only work on the primary database
    ReadByCPF(cpf) {

        const query = `SELECT * FROM ${this.PRIMARY_TABLE} WHERE cpf = '${cpf}'`

        this.db.query(query, (err, res) => {
            if (err) throw (err, res)

            console.log(res)
        })
    }

    // only works on the secondary database
    ReadByClientID(clientID) {

        const query = `SELECT * FROM ${this.SECONDARY_TABLE} WHERE clientID = '${clientID}'`

        this.db.query(query, (err, res) => {
            if (err) throw (err, res)

            console.log(res)
        })
    }

    Update(table, id, values) {

        const updateQuery = `UPDATE ${this.GetTableName(table)} SET ? WHERE id = ${id}`

        this.db.query(updateQuery, values, (err, res) => {
            if (err) throw (err, res)

            console.log('Successfully updated!')
        })
    }

    Remove(table, id) {
        const query = `DELETE FROM ${this.GetTableName(table)} WHERE id = ${id}`

        this.db.query(query, (err, res) => {
            if (err) throw err, res

            console.log('Successfully removed!')
        })
    }

    // returns a dictionary with the data condensed
    GetClientInfo() {
        // Full name, CPF, street info, personal info ...

        // TODO: it may need to be updated ( add more info )
        const name = prompt('Name ? ')
        const cpf = prompt('CPF ? ')
        const streetName = prompt('Street name ? ')
        const houseNumber = prompt('Number of your house ? ')
        const neighborhoodName = prompt('Neighborhood name ? ')

        // Passes all the info to a dictionary
        const values = {
            'name': name,
            'cpf': cpf,
            'streetName': streetName,
            'houseNumber': houseNumber,
            'neighborhoodName': neighborhoodName,
        }

        return values
    }

    GetOrderInfo() {
        // ClientID, computerProblem, desktop or notebook, accessories ...

        // TODO: it may need to be updated ( add more info )
        const clientID = prompt('Client ID ? ')
        const computerType = prompt('Desktop or Notebook ? ')
        const computerProblem = prompt('What is the computer problem ? ')
        const accessories = prompt('Which accessories does it has ? ')

        const values = {
            'clientID': clientID,
            'computerProblem': computerProblem,
            'computerType': computerType,
            'accessories': accessories
        }

        return values
    }

    GetTableName(table) {
        return table === 0 ? 'clients' : 'orders'
    }

    QuitConnection() {
        this.db.end((err) => {
            if (err) throw err

            console.log('End!')
        })
    }
}

module.exports = Database