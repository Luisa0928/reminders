/**
 * Este modulo contiene la logica del negocio, funciones que dan las instrucciones para que funcione el programa
 * @module services
 */

/**
 * Importa las funciones que se conectan con la base de datos pertenecientes al modulo models
 * @requires module {@link module: models}
 */
const {
    statusActual,
    saveReminder,
    getReminders,
    deleteReminders } = require("../models/remindModels.js")

/**
 * Importa la funcion overdueStatus que identifica el momento extacto en que se cumple el recordatorio, perteneciente al modulo utils
 * @requires module {@link module: utils}
 */
const { overdueStatus } = require("../utils/remindUtils.js")

/**
 * Crea un objeto vacio que contendra los recordatorios que se eliminan antes de cumplirse
 * @type {{year: number, month: number, day: number, hour: number, minute: number, tittle: string, estado: boolean}}
 */

var reminderDeleted = {}

/**
 * Funcion que le pone un titulo al elemento titulo del objeto que representa un recordatorio eliminado 
 * @param {string} title 
 */

function setTitle(title) {
    reminderDeleted[title] = title
}

/**
 * Esta funcion imprime el titulo del recordatorio cuando comprueba que es el momento indicado, de lo contrario espera un segundo para volverse a ejecutar
 * @param {number} year año del recordatorio
 * @param {number} month mes del recordatorio
 * @param {number} day dia del recordatorio
 * @param {number} hour hora del recordatorio
 * @param {number} minute minuto del recordatorio
 * @param {string} sendMessage es un callback que imprime el titulo del recordatorio cuando se ejecuta el resolve de la promesa
 * Si el recordatorio no se cumple: Evalua si el recordatorio esta vencido o si esta pendiente e imprime el mensaje correspondiente
 */

 
function isItTimeToSendTheReminder(year, month, day, hour, minute, sendMessage) {
    var date = new Date()
    if (overdueStatus(year, month, day, hour, minute) == 0) {
        sendMessage()
    }
    else {
        setTimeout(function () { isItTimeToSendTheReminder(year, month, day, hour, minute, sendMessage) }, 1000)
        if (overdueStatus(year, month, day, hour, minute) == 1) {
            console.log("Recordatorio vencido")
        }
        if (overdueStatus(year, month, day, hour, minute) == -1) {
            console.log("Recordatorio pendiente.Faltan " + (minute - date.getMinutes()) + " minutos")
        }
    }

}
/**
 * Esta funcion crea la promesa de enviar el recordatorio cuando se cumpla y si se cumple le cambia el estado a vencido.
 * @param {number} year año en que se enviará el recordatorio
 * @param {number} month mes en que se enviará el recordatorio
 * @param {number} day dia en que se enviará el recordatorio
 * @param {number} hour hora en que se enviará el recordatorio
 * @param {number} minute minuto en que se enviará el recordatorio
 * @param {string} tittle titulo del recordatorio
 */

function secretary(year, month, day, hour, minute, tittle) {
    const myPromise = new Promise(function (resolve, reject) {
        isItTimeToSendTheReminder(year, month, day, hour, minute, function () {
            resolve(tittle)
        })
    })
    myPromise.then(function (reminderMessage) {
        if (reminderDeleted[tittle] == undefined) {
            statusActual(tittle)
            console.log(reminderMessage)
        } 
    })
}
/**
 * Esta funcion usa el callback que trae los recordatorios de la base de datos y evalua si estan vencidos, pendientes o activos para actualizar su estatus en la base de datos
 */
function updateStatus() {
    getReminders(function (reminderslist) {
        if (reminderslist != undefined) {
            var titleList = Object.keys(reminderslist)
            var i = 0
            while (i < titleList.length) {
                var id = reminderslist[titleList[i]]
                var status = id.estado
                if (status == true) {
                    if (overdueStatus(id.year, id.month, id.day, id.hour, id.minute) == 0) {
                        setTimeout(function () { statusActual(id.tittle) }, 1000)
                    }
                    if (overdueStatus(id.year, id.month, id.day, id.hour, id.minute) == 1) {
                        statusActual(id.tittle)
                    }
                }
                i += 1
            }
        }

    })
}
/**
 * Invoca la funcion updateStatus para que se actualice el status apenas se abra el programa, sin esperar que se creen solicitudes por el usuario
 */
updateStatus()

/**
 * Esta funcion se trae todos los recordatorios de la base de datos, llamando la funcion getReminders
 * @param {funcion} callback contiene los objetos de los recordatorios creados por el usuario
 */
function getReminderService(callback) {
    getReminders(function (data) {
        callback(data)
    })
}

/**
 * Guarda el recordatorio recien creado en la base de datos y verifica la promesa de enviar el recordatorio en el momento indicado
 * @param {number} year año en que se cumplirá el recordatorio
 * @param {number} month mes en que se cumplirá el recordatorio
 * @param {number} day dia en que se cumplirá el recordatorio
 * @param {number} hour hora en que se cumplirá el recordatorio
 * @param {number} minute minuto en que se cumplirá el recordatorio
 * @param {string} tittle titulo del recordatorio
 * @returns {string} Le indica al usuario que se creo exitosamente el recordatorio
 */
function createReminderService(year, month, day, hour, minute, tittle) {
    secretary(year, month, day, hour, minute, tittle)
    saveReminder(year, month, day, hour, minute, tittle)
    return "El recordatorio ha sido creado"
}

/**
 * Guarda el recordatorio en el objeto de recordatorios eliminados y lo elimina de la base de datos
 * @param {string} tittle titulo del recordatorio a eliminar
 * @returns {string} confirma al usuario que ya se elimino el recordatorio
 */
function deleteReminderService(tittle) {
    setTitle(tittle)
    deleteReminders(tittle)
    return "El recordatorio ha sido eliminado"
}

/**
 * Exporta las funciones dentro del objeto al archivo remindController.js
 * {@link module: controller}
 */
module.exports = {
    getReminderService,
    createReminderService,
    deleteReminderService,
}
