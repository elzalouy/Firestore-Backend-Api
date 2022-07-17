import helmet from "helmet";
import compression from "compression";

export default (app: any) => {
  app.use(helmet());
  app.use(compression());
};
