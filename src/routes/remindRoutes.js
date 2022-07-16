/**
 * Este archivo expone las rutas de acceso a inputs
 * @module routes
 */
/**
 *Con esta constante estoy llamando la funcion express que importa la libreria express
 */
const express = require('express')

/**
* Con esta constante llamo el objeto router que carga una función de middleware en él, define algunas rutas y monta el módulo de direccionador en una vía de acceso en la aplicación principal.
 */
const route = express.Router()

/**
 * This constant contains the controller path
 *  @requires module {@link module: controller}
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

/**
 * Exporta la contante "route" al archivo index.js
 * {@link module: index}
 */
module.exports = {
    route
}
