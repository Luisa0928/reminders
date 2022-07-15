var admin = require("firebase-admin");
var serviceAccount = require("./privatekey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://reminders-6e91d-default-rtdb.firebaseio.com"
});
var db = admin.database()

module.exports = {
    database: db
}
