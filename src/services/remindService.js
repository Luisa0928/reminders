const {
    statusActual,
    saveReminder,
    getReminders,
    deleteReminders } = require("../models/remindModels.js")

const { overdueStatus } = require("../utils/remindUtils.js")

var reminderDeleted = {}

function setTitle(title) {
    reminderDeleted[title] = title
}

//Esta funcion imprime el titulo del recordatorio cuando comprueba que es el momento indicado, de lo contrario espera un segundo para volverse 
//a ejecutar
 
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
 * Sets the promise that will show the message received by param
 * when the time, also given as a param, is met
 * @param {number} hour 
 * @param {number} minute 
 * @param {number} seg 
 * @param {string} message 
 */

// Esta funcion enviará en el futuro un recordatorio y lo eliminará de la lista, si ya está vencido o fue invalidado por el usuario
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

// Esta funcion pone el status del recordatorio en la base de datos segun su momento en el tiempo
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
//Invoca el metodo que carga las alarmas
updateStatus()

//Devuelve todas las alarmas
function getReminderService(callback) {
    getReminders(function (data) {
        callback(data)
    })
}


//Crea alarmas
function createReminderService(year, month, day, hour, minute, tittle) {
    secretary(year, month, day, hour, minute, tittle)
    saveReminder(year, month, day, hour, minute, tittle)
    return "El recordatorio ha sido creado"
}

//Elimina alarmas
function deleteReminderService(tittle) {
    setTitle(tittle)
    deleteReminders(tittle)
    return "El recordatorio ha sido eliminado"
}

module.exports = {
    getReminderService,
    createReminderService,
    deleteReminderService,
}
