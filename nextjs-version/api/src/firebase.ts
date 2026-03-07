import * as admin from 'firebase-admin';

import * as serviceAccount from './firebase-service-account.json';


if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    databaseURL: "https://hot-dog-kings-default-rtdb.firebaseio.com"
  });
}

const app = admin.apps[0];

export { admin, app, serviceAccount };