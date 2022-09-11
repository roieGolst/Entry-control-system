import user from "./users/userRoutes";
import device from "./device/deviceRoutes";
import premission from "./permission/permissionRoutes";
import logs from "./logs/logsRoutes";
import entry from "./entry/entryRoutes";
import login from "./login/loginRouts";
import soldier from "./soldier/soldierRoutes";
import token from "./token/authValidate";

export {user, device, premission, logs, entry, login, soldier, token};