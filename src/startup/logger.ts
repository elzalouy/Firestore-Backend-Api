import winston from "winston";

export default () => {
  winston.exceptions.handle(
    new winston.transports.File({ filename: "logfile.log" })
  );
  winston.add(
    new winston.transports.File({
      filename: "logfile.log",
      handleExceptions: true,
    })
  );
};
