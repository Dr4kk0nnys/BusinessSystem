const utils = require('./modules/utils.js')

class System {
    constructor() {

        // Showing the date
        console.log(utils.GetLocalTime())
    }
}

new System()