/**
 * Este modulo contiene el protocolo de autorizacion para conectarse a la base de datos de firebase
 * @module configuraciones
 */

/**
 * Protocolo de autorizacion para acreditar la validez de la conexión con la base de firebase
 */
var serviceAccount = require("./privatekey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://reminders-6e91d-default-rtdb.firebaseio.com"
});
var db = admin.database()

/**
 * Exporta el comando que permite usar la base de datos al archivo remindModels.js
 * {@link module models}
 */
module.exports = {
    database: db
}
