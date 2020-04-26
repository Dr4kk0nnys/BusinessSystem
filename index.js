// TODO: make a config.txt, each line is a key component, it will read each line at the start of the program, the first line will be like: 'Tech company' or 'Bread shop'


const prompt = require('prompt-sync')()

const utils = require('./modules/utils')
const Database = require('./modules/database')

class System {
    constructor() {

        // initializing the database
        this.database = new Database()

        // showing the date
        console.log(utils.GetLocalTime())

        // showing the options to the user ...
        utils.ShowOptions()

        // although this function doesn't handle the user input itself
        // it makes sure the input is valid
        const userInput = this.GetUserInput()

        this.HandleUserInput(userInput)
    }

    // Only get the user input, it doesn't handle it
    GetUserInput() {
        let optionID = prompt('> ')

        while (/^\d+$/.test(optionID) == false) {
            console.log('Invalid input!')
            optionID = prompt('> ')
        }

        return optionID
    }

    HandleUserInput(optionID) {

        /*
            [ 1 ] - Add client 
            [ 2 ] - Remove client  
            [ 3 ] - Update client 

            [ 4 ] - Add order 
            [ 5 ] - Remove order 
            [ 6 ] - Update order 
        */

        switch (optionID) {
            case '1':

                // Full name, CPF, street info, desktop or notebook, accessories ...
                console.log('Add client ... \n')

                const name = prompt('Name ? ')
                const cpf = prompt('CPF ? ')
                const streetName = prompt('Street name ? ')
                const neighborhoodName = prompt('Neighborhood name ? ')
                const houseNumber = prompt('Number of your house ? ')
                const computerType = prompt('Is it a desktop or a notebook ? ')
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

                // connecting to the database for editing/adding/removing purpouses
                this.database.Connect()

                // Saves all the data
                this.database.Add(values)

        }
    }
}


new System()