import "dotenv/config";
import logger from "./config/logger.config.js";

import env from "./config/env.check.js";
import app from "./app.js";

const port = process.env.PORT;

app.listen(port, () => {
  logger.info(
    `Server is running on port ${port} in ${process.env.NODE_ENV} mode`,
  );
});
