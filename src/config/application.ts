import { IConfig } from "../interfaces/applicationConfig";
import * as dotenv from "dotenv";
const path = `${__dirname}/../../.env`;
const environmentDetails = dotenv.config({ path }).parsed;

if (!environmentDetails) {
  throw new Error("CONFIG NOT SET");
}

let serverPort, isCloudLog, sendErrorStack;
// Validations
if (!environmentDetails.__NODE_PORT__) {
  throw new Error("Check Environmet file!! - __NODE_PORT__");
} else {
  serverPort = parseInt(environmentDetails.__NODE_PORT__);
}

if (environmentDetails.ISCLOUDLOG && environmentDetails.ISCLOUDLOG == "true") {
  isCloudLog = true;
} else {
  isCloudLog = false;
}
if (
  environmentDetails.sendErrorStack &&
  environmentDetails.sendErrorStack == "true"
) {
  sendErrorStack = true;
} else {
  sendErrorStack = false;
}

export const Config: IConfig = {
  serverPort,
  sendErrorStack,
  env: environmentDetails.NODE_ENV,
};
