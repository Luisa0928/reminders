/**
 * Este modulo contiene las funciones utiles que activan el resto de procesos en los otros modulos
 * @module utils
 */

/**
 * Esta funcion compara el momento actual con el momento en que se debe activar el recordatorio que creo el usuario, y evalua si esta vencido, pendiente o activo
 * @param {number} year año en que se cumplirá el recordatorio
 * @param {number} month mes en que se cumplirá el recordatorio
 * @param {number} day dia en que se cumplirá el recordatorio
 * @param {number} hour hora en que se cumplirá el recordatorio
 * @param {number} minute minuto en que se cumplirá el recordatorio
 * @returns {number} Si retorna 0: el recordatorio esta en el momento en que se cumple. Si retorna 1:el recordatorio esta vencido. Si retorna -1: el recordatorio aun no se cumple(pendiente)
 */
function overdueStatus(year, month, day, hour, minute) {
    var date = new Date()
    var dateNow = {
        yearActual: date.getFullYear(),
        monthActual: date.getMonth() + 1,
        dayActual: date.getDate(),
        hourActual: date.getHours(),
        minuteActual: date.getMinutes()
    }
    if(dateNow.yearActual == year){
        if(dateNow.monthActual== month){
            if(dateNow.dayActual==day){
                if(dateNow.hourActual==hour){
                    if(dateNow.minuteActual==minute){
                        return 0
                    }
                }
            }

        }
    }
    if(dateNow.yearActual<year) {
        return -1
    }
    if (dateNow.yearActual>year) {
        return 1
    } else {
        if (dateNow.yearActual ==year) {
            if (dateNow.monthActual > month) {
                return 1
            } else {
                if (dateNow.monthActual == month) {
                    if (dateNow.dayActual > day) {
                        return 1
                    } else {
                        if (dateNow.dayActual == day) {
                            if (dateNow.hourActual > hour) {
                                return 1
                            } else {
                                if (dateNow.hourActual == hour) {
                                    if (dateNow.minuteActual > minute) {
                                        return 1
                                    } else {
                                        return -1
                                    }
                                } else {
                                    return -1
                                }

                            }
                        } else {
                            return -1
                        }
                    }
                } else {
                    return -1
                }
            }
        }else{
            return -1
        } 
    }
}

/**
 * Exporta la funcion en el objeto al modulo servicios
 * {@link module: services}
 */

module.exports = {
    overdueStatus
}
