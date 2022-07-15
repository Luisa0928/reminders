const express = require('express')
const route = express.Router()

const remindController = require("../controllers/remindController.js")

//Devuelve todas las alarmas 
route.get('/reminder', remindController.getReminder)

//Crea alarmas
route.post('/reminder', remindController.createReminder)

//Elimina alarmas
route.delete('/reminder/:tittle', remindController.deleteReminder)

module.exports = {
    route
}
