import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import config from "config";
import winston from "winston";

export default () => {
  try {
    let serviceAccount: ServiceAccount = {
      privateKey: `${config.get("private_key")}`.replace(/\\n/g, "\n"),
      clientEmail: config.get("client_email"),
      projectId: config.get("project_id"),
    };
    initializeApp({
      credential: cert(serviceAccount),
    });
    const DB = getFirestore();
    return DB;
  } catch (error) {
    winston.error({ startupDBError: error });
  }
};
