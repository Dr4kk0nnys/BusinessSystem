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
                console.log('Adding clinet ... \n')

                /*
                    - GetUserData() takes the user input
                    - and gets all the necessary info ( it can be null as well )
                    - It's stored as 'clientInfo' and it's a dictionary with all
                    - the info condensed
                    - It then passes this data to the database through the Add function
                */
                const clientInfo = this.database.GetUserData()
                this.database.Add(clientInfo)

                break

            case '2':
                console.log('Removing client ... \n')

                /*
                    - It first asks for the client id
                    - and while the client id isn't a number
                        -> IsNumber is such an useful function
                        -> that only returns true if it's a number
                        -> it's also a regex expression
                    - it keep asking for the right id
                    - It then removes the id

                    .Note: If there's no such id, it won't remove nor print anything
                */

                let clientID = prompt('What is the client id ? ')

                while (utils.IsNumber(clientID) === false) {
                    console.log('Invalid value!')
                    clientID = prompt('What is the client id ? ')
                }

                this.database.Remove(clientID)

                break

            case '3':
                console.log('Updating client info ... \n')

                /*
                    - Update is a combination of remove and add
                    - it first asks for the client id
                    - it then ask for the new info
                    - then update the old data
                */

                let id = prompt('What is the client id you want to update ? ')

                while (utils.IsNumber(id) === false) {
                    console.log('Invalid value!')
                    id = prompt('What is the client id you want to update ? ')
                }

                const newClientInfo = this.database.GetUserData()

                this.database.Update(Number(id), newClientInfo)

                break

            case '8':
                this.database.Read()

                break
        }
    }
}


new System()