// TODO: make a config.txt, each line is a key component, it will read each line at the start of the program, the first line will be like: 'Tech company' or 'Bread shop'


const prompt = require('prompt-sync')({
    sigint: true
})

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

        while (utils.IsNumber === false) {
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

            [ 7 ] - Leave
            [ 8 ] - Read
        */

        switch (optionID) {
            case '1':

                // GetUserData returns the info -> Name, cpf, adress ...
                const clientInfo = this.database.GetUserData()

                // Saves all the data
                this.database.Add(clientInfo)

                break

            case '2':
                console.log('Removing client ... \n')

                let clientID = prompt('What is the client id ? ')

                while (utils.IsNumber(clientID) === false) {
                    console.log('Invalid value!')
                    clientID = prompt('What is the client id ? ')
                }

                this.database.Remove(clientID)

            case '3':
                console.log('Updating client info ... \n')

                let id = prompt('What is the client id you want to update ? ')

                while (utils.IsNumber(id) === false) {
                    console.log('Invalid value!')
                    id = prompt('What is the client id you want to update ? ')
                }

                const newClientInfo = this.database.GetUserData()

                console.log(newClientInfo)

                this.database.Update(Number(id))

                break

            case '8':
                this.database.Read()

                brek
        }
    }
}


new System()