/**
 * Este modulo contiene las funciones que se contecan con la base de datos
 * @module models
 */
/**
 * Importa la conexion con la base de Firebase
 * @requires module {@link module: configuraciones}
 */
const { database } = require("../configs/remindConfig.js")

/**
 * Entra al elemento "estado" del recordatorio y lo pasa de true si esta pendiente de cumplirse o false si ya se venció
 * @param {string} tittle titulo del recordatorio 
 */

function statusActual(tittle) {
    database.ref("reminders/" + tittle + "/estado").set(false)
}

/**
 * Esta funcion guarda en la base de datos de Firebase cada recordatorio creado como un objeto
 * @param {number} year año en que se cumplirá el recordatorio
 * @param {number} month mes en que se cumplirá el recordatorio
 * @param {number} day dia en que se cumplirá el recordatorio
 * @param {number} hour hora en que se cumplirá el recordatorio
 * @param {number} minute minuto en que se cumplirá el recordatorio
 * @param {string} tittle titulo del recordatorio, que es a la vez el key de la base
 */

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

/**
 * Esta funcion devuelve la lista de recordatoios creados en la base
 * @param {funcion} callback expone los objetos con los datos de cada recordatorio
 */

function getReminders(callback) {
    database.ref("reminders").once("value", function (snapshot) {
        var data = snapshot.val()
        callback(data)
    })
}

/**
 * Esta funcion elimina recordatorios en la base de Firebase
 * @param {string} tittle titulo del recordatorio
 */

function deleteReminders(tittle) {
    database.ref("reminders/" + tittle).remove()
}

/**
 * EXporta las funciones dentro del objeto al modulo services
 * {@link module: services}
 */
module.exports = {
    statusActual,
    saveReminder,
    getReminders,
    deleteReminders,
}
