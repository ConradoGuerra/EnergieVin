import { Router } from "express";

import wines from "@modules/wine/infra/http/wines.routes";
import users from "@modules/user/infra/http/users.routes";

const routes = Router();

routes.use("/wines", wines);
routes.use("/users", users);

export default routes;
