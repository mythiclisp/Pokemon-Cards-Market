import * as functions from "firebase-functions";

// http callable function
exports.sayHello = functions.https.onCall((data) => {
    const name = data.name;
    return `hello ${name} :)`;
});