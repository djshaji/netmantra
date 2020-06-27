const functions = require('firebase-functions');
const rp = require('request-promise');
const { ref } = require('firebase-functions/lib/providers/database');
const admin = require('firebase-admin');
admin.initializeApp();
var db = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.checkRecaptcha = functions.https.onRequest((req, res) => {
    const response = req.query.response
    console.log(" response", req.query)
    rp({
        uri: 'https://recaptcha.google.com/recaptcha/api/siteverify',
        method: 'POST',
        formData: {
            secret: '6Lemq6YZAAAAAGfLiuqFrOIt18_-orCy_T4gY2KH',
            response: response
        },
        json: true
    }).then(async  result =>  {
        console.log("recaptcha result", result)
        if (result.success) {
            document = db.collection ("messages").doc (req.query.email)
            await document.set (req.query)
            res.send(" \
                <script>\
                alert ('Message Submitted');\
                location.href='/index.html';\
                </script>\
            ")

        }
        else {
            res.send(" \
            <script>\
            alert ('Could not send message')\
            </script>\
        ")
    //    res.send("Recaptcha verification failed. Are you a robot?" + req.query)
        }
    }).catch(reason => {
        console.log("Recaptcha request failure", reason)
        res.send("Recaptcha request failed.")
    })
})
