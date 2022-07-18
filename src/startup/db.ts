import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import config from "config";
import winston from "winston";

export default () => {
  try {
    // let serviceAccount: any = {
    //   type: config.get("type"),
    //   private_key: `${config.get("private_key")}`.replace(/\\n/g, "\n"),
    //   client_email: config.get("client_email"),
    //   project_id: config.get("project_id"),
    //   private_key_id: config.get("private_key_id"),
    //   client_id: config.get("client_id"),
    //   auth_uri: config.get("auth_uri"),
    //   token_uri: config.get("token_uri"),
    //   auth_provider_x509_cert_url: config.get("auth_provider_x509_cert_url"),
    //   client_x509_cert_url: config.get("client_x509_cert_url"),
    // };
    // console.log(serviceAccount);
    initializeApp({
      credential: cert(
        require("../../unifood-356514-firebase-adminsdk-scup7-7953171ec5.json")
      ),
    });
    const DB = getFirestore();
    return DB;
  } catch (error) {
    winston.error({ startupDBError: error });
  }
};
