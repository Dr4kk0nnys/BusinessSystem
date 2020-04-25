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