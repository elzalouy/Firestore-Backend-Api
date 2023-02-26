import config from "config";
import winston from "winston";

export default () => {
  try {
  } catch (error) {
    winston.error({ startUpConfigurationError: error });
  }
};
