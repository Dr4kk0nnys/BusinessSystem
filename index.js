// TODO: make a config.txt, each line is a key component, it will read each line at the start of the program, the first line will be like: 'Tech company' or 'Bread shop'

// PROJECT FAIL: I CANNOT MAKE A WHILE LOOP AND MAKE THIS SHIT PRINT OUT THE QUERY ON THE FUCKING SCREEN ( FUCK THIS I'M GONNA PROGRAM THIS WHOLE SHIT IN PYTHON )

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

        const userInput = this.GetUserInput()

        const response = this.HandleUserInput(userInput)
        // this.database.ReadByName(userInput)

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
            Client options ( primary database ) {
                [ 1 ] - Add client 
                [ 2 ] - Remove client
                [ 3 ] - Update client 
            }

            Order options ( secondary database ) {
                [ 4 ] - Add order 
                [ 5 ] - Remove order 
                [ 6 ] - Update order 
            }
            
            [ 7 ] - Read Client's database
            [ 8 ] - Read Order's database
            [ 9 ] - Leave
        */

        switch (optionID) {
            case '1':
                console.log('Adding client ... \n')

                /*
                    - GetUserData() takes the user input
                    - and gets all the necessary info ( it can be null as well )
                    - It's stored as 'clientInfo' and it's a dictionary with all
                    - the info condensed
                    - It then passes this data to the database through the Add function
                */
                const clientInfo = this.database.GetClientInfo()
                this.database.Add(0, clientInfo)

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

                this.database.Remove(0, clientID)

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

                const newClientInfo = this.database.GetClientInfo()

                this.database.Update(0, Number(id), newClientInfo)

                break

            // Order options ...

            case '4':
                console.log('Adding order ... \n')

                const orderInfo = this.database.GetOrderInfo()
                this.database.Add(1, orderInfo)

                break

            case '5':
                console.log('Removing order ... \n')

                let orderID = prompt('What is the order id ? ')

                while (utils.IsNumber(orderID) === false) {
                    console.log('Invalid value!')
                    orderID = prompt('What is the order id ? ')
                }

                this.database.Remove(1, orderID)

                break

            case '6':
                console.log('Updating order ... \n')

                let updateOrderID = prompt('What is the order id you want to update ? ')

                while (utils.IsNumber(updateOrderID) === false) {
                    console.log('Invalid value!')
                    orderID = prompt('What is the order id you want to update ? ')
                }

                const newOrderInfo = this.database.GetOrderInfo()

                this.database.Update(1, Number(updateOrderID), newOrderInfo)

                break

            // Others ...

            case '7':
                const option = prompt('ID or Name or CPF ? ')

                if (option == 'ID') {
                    const ID = prompt('Client ID ? ')

                    this.database.ReadByID(0, ID)
                } else if (option == 'Name') {
                    const name = prompt('Client name ? ')

                    this.database.ReadByName(name)
                } else if (option == 'CPF') {
                    const cpf = prompt('Client CPF ? ')

                    this.database.ReadByCPF(cpf)
                } else {
                    console.log('Invalid!')
                }

                break

            case '8':
                const choice = prompt('ID or ClientID ? ')

                if (choice === 'ID') {
                    const ID = prompt('ID ? ')

                    this.database.ReadByID(1, ID)
                } else if (choice === 'ClientID') {
                    const client = prompt('Client ID ? ')

                    this.database.ReadByClientID(client)
                }

                break

            case '9':
                return false
        }
    }
}


new System()