import { app } from "./app";
import { EnvConfig } from "./config/env";

const port = EnvConfig.port;
app.listen(port, () => {
  console.log("App running in port: " + port);
});
