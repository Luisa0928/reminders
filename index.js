const express = require('express')
const app = express()
app.use(express.json())

const { route } = require("./src/routes/remindRoutes.js")
app.use(route)

//Determina el puerto desde el cual se van a escuchar las peticiones del cliente
app.listen(3000)

/* Algoritmo
1)Crear recordatorio
2)Poner titulo
3)Poner descripcion
4)Poner fecha y hora
5)Debe guardar el recordatorio
6)Si el usuario elimina o actualiza debe cambiar status
7)Cuando sea la fecha y hora programada debe enviarme recordatorio con mensaje
8)Debe actualizar el status del recordatorio (pendiente, vencido, eliminado)
9)Debe eliminar los recordatorios vencidos y los eliminados directamente por el usuario

/* Key takeways
a) Pueden haber varios recordatorios para un mismo momento
b) Puedo eliminar recordatorios antes de que se cumplan
c) Puedo tener recordatorios sin cumplirse y cumplidos
d) Puedo tener recordatorios en meses posteriores y años posteriores
e) Puedo actualizar la fecha de un recordatorio
f) Si desconecto el servidor y me meto segundos despues de un recordatorio se cumpliera, debe ponerle estatus vencido
g) Debe alertarme de los recordatorios vencidos
h) Si creo un recordatorio con fecha en el pasado debe ponerlo vencido instantaneamente 
i) Validar si la fecha del recordatorio esta en el futur
*/
