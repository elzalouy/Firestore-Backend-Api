import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import config from "config";
import winston from "winston";

export default () => {
  try {
    if (
      config.has("private_key") &&
      config.has("client_email") &&
      config.has("project_id")
    ) {
      let serviceAccount: any = {
        private_key: `${config.get("private_key")}`.replace(/\\n/g, "\n"),
        client_email: config.get("client_email"),
        project_id: config.get("project_id"),
      };
      initializeApp({
        credential: cert(serviceAccount),
      });
      const DB = getFirestore();
      return DB;
    }
  } catch (error) {
    winston.error({ startupDBError: error });
  }
};
