import config from "config";
import winston from "winston";

export default () => {
  try {
    if (!config.has("private_key"))
      winston.error("No private key provided for FrieStore connection");
    if (!config.has("client_email"))
      winston.error("No client email provided for FireStore connection");
    if (!config.has("project_id"))
      winston.error("No Provided project id for FireStore connection");
    if (!config.has("FrontEndUrl"))
      winston.error("No front end url provided for integration");
  } catch (error) {
    winston.error({ startUpConfigurationError: error });
  }
};
