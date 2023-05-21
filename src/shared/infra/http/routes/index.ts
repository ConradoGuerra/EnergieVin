import { Router } from "express";

import bulkWines from "@modules/wine/infra/http/wines.routes";

const routes = Router();

routes.use("/wines", bulkWines);

export default routes;
