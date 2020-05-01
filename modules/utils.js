exports.GetLocalTime = () => {
    let date = new Date()

    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()

    let day = date.getDate()
    let month = date.getMonth() + 1 // Index 0
    let year = date.getFullYear()

    return `${day}/${month}/${year}    ${hours}:${minutes}:${seconds}`
}

exports.ShowOptions = () => {

    // Client options ...
    console.log('[ 1 ] - Add client \n' +
        '[ 2 ] - Remove client \n' +
        '[ 3 ] - Update client \n' +
        '\n' +
        // Order options ...
        '[ 4 ] - Add order \n' +
        '[ 5 ] - Remove order \n' +
        '[ 6 ] - Update order \n' +
        '\n' +
        '[ 7 ] - Leave \n' +
        '[ 8 ] - Read \n')
}

exports.IsNumber = (value) => {
    return /^\d+$/.test(value)
}