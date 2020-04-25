const prompt = require('prompt-sync')()

const utils = require('./modules/utils.js')


class System {
    constructor() {

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

                // Full name ...

                console.log('Add client ...')

                const name = prompt('Name ? ')
                const age = prompt('Age ? ')
        }
    }
}


new System()