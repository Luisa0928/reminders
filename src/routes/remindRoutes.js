/**
 * Este archivo expone las rutas de acceso a inputs y exporta la funcion route
 * @module routes
 */
/**
 * @constant express Con esta variable estoy importando la libreria express
 */
const express = require('express')

/**
 * @constant route  crea un direccionador como un módulo, carga una función de middleware en él, define algunas rutas y monta el módulo de direccionador en una vía de acceso en la aplicación principal.
 * @default
 */
const route = express.Router()

/**
 @constant remindController  This constant contains the controller path
 @requires modules {@link controller}
 @default
 */
const remindController = require("../controllers/remindController.js")

/**
 * Direciona la obtecion de alarmar (get) al cliente con las instrucciones descritas en la funcion getReminder del modulo controller
 * This class requires the modules {@link module: controller}
 */
route.get('/reminder', remindController.getReminder)

/**
 * Direciona la creacion de alarmas (post) al cliente con las instrucciones descritas en la funcion createReminder del modulo controller
 * This class requires the modules {@link module: controller}
 */
route.post('/reminder', remindController.createReminder)

/**
 * Direciona la eliminacion de alarmas (delete) al cliente con las instrucciones descritas en la funcion deleteReminder del modulo controller
 * This class requires the modules {@link module: controller}
 */
route.delete('/reminder/:tittle', remindController.deleteReminder)


module.exports = {
    route
}
