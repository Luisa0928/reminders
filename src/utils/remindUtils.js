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


module.exports = {
    overdueStatus
}
