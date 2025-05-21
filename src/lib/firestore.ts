const admin = require('firebase-admin');

const serviceAccount = require("C:\\Users\\betsy.nazareno_devsu\\Desktop\\chatug-5cfe95be1efc.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: 'chatug',
  });
}

export const DB = admin.firestore();
