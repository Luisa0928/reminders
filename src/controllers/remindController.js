const {
    getReminderService,
    createReminderService,
    deleteReminderService} = require("../services/remindService.js")

//Crea un objeto que contiene los recordatorios eliminadas por el usuario antes de que se cumplan y los
//que se cumplen.

//Devuelve todas las alarmas
function getReminder(req, res) {
    getReminderService(function(data) {
        res.send(data)
    })
}

//Crea alarmas
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

//Elimina alarmas
function deleteReminder(req, res) {
    var tittle= req.params.tittle
    if (!tittle) res.send("Error: missing title")
    res.send(deleteReminderService(tittle))
}

/**
 * Este modulo  crea la logica de intrucciones que deben recibir los metodos post, get y delete
 * @modules controller
 */
module.exports = {
    getReminder,
    createReminder,
    deleteReminder
}