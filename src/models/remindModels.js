const { database } = require("../configs/remindConfig.js")

//Entra al elemento del status del recordatorio y lo pasa de true a false
function statusActual(tittle) {
    database.ref("reminders/" + tittle + "/estado").set(false)
}

//Guarda en la base de datos el recordatorio
function saveReminder(year, month, day, hour, minute, tittle) {
    database.ref("reminders/" + tittle).set({
        year: year,
        month: month,
        day: day,
        hour: hour,
        minute: minute,
        tittle: tittle,
        estado:true
    })
}

// Esta funcion devuelve la lista de recordatoios creados en la base
function getReminders(callback) {
    database.ref("reminders").once("value", function (snapshot) {
        var data = snapshot.val()
        callback(data)
    })
}

//Esta funcion elimina recordatorios
function deleteReminders(tittle) {
    database.ref("reminders/" + tittle).remove()
}
module.exports = {
    statusActual,
    saveReminder,
    getReminders,
    deleteReminders,
}
