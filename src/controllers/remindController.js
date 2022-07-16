/**
 * Este modulo  crea la logica de intrucciones que deben recibir los metodos post, get y delete
 * @module controller
 */

/**
 * Importa del module services las funciones getReminderService, createReminderService y deleteReminderService
 * @requires module {@link module: services}
 */
const {
    getReminderService,
    createReminderService,
    deleteReminderService} = require("../services/remindService.js")
/**
 * Esta funcion devuelve la funciona getReminderSevice que tiene un callback para devolver los recordatorios
 * @param {string} req en esta funcion no se pide requerimienro al usuario
 * @param {number|string} res esta funcion devuelve los recordatorios creados por el usuario
 */

function getReminder(req, res) {
    getReminderService(function(data) {
        res.send(data)
    })
}

/**
 * Esta funcion llama la funcion createReminderService y pide la fecha del recordatorio y devuelve un mensaje de error si se identifica incompletitud de los datos.
 * @param {string|number} req pide que el usuario llene el titulo de la alarma y los valores de la fecha
 * @param {string} res responde un mensaje de error
 */
function createReminder(req, res) {
    const {year, month, day, hour, minute, tittle } = req.body
    if (!year) res.send("Error: Missing hour")
    if (!month) res.send("Error: Missing month")
    if (!day) res.send("Error: Missing day")
    if (!hour) res.send("Error: Missing hour")
    if (!minute) res.send("Error: Missing minute")
    if (!tittle) res.send("Error: Missing title")
    res.send(createReminderService(year, month, day, hour, minute,tittle))
}

/**
 * Esta funcion llama la funcion deleteReminderService y pide al usuario el titulo del recordatorio para eliminarlo, tambien manda mensaje de error si falta el titulo del recordatorio 
 * @param {string} req  pide al usuario el titulo del recordatorio que desea eliminar
 * @param {string} res  envia mensaje de error si falta el titulo del recordatorio
 */

function deleteReminder(req, res) {
    var tittle= req.params.tittle
    if (!tittle) res.send("Error: missing title")
    res.send(deleteReminderService(tittle))
}

/**
 * Exporta las funciones dentro del objeto al archivo remindRoutes.js que se conecta con los metodos de peticion de express
 * {@link module: routes}
 */

module.exports = {
    getReminder,
    createReminder,
    deleteReminder
}