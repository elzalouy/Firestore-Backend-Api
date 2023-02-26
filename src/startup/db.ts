import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import config from "config";
import winston from "winston";

export default () => {
  try {
    let serviceAccount: any = {
      privateKey: `${config.get("firebase_privateKey")}`.replace(/\\n/g, "\n"),
      projectId: config.get("firebase_project_id"),
      clientEmail: config.get("firebase_clientEmail"),
    };
    let App = initializeApp({ credential: cert(serviceAccount) });
    const DB = getFirestore(App);
    return { DB, App };
  } catch (error) {
    winston.error({ startupDBError: error });
  }
};
