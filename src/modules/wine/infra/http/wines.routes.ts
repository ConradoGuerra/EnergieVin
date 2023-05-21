import BulkCreateWinesController from "@modules/wine/useCases/bulkCreateWine/BulkCreateWineController";

import { Router } from "express";
const bulkCreateWinesController = new BulkCreateWinesController();

const bulkWines = Router();
bulkWines.get("/bulk-create", bulkCreateWinesController.handle);

export default bulkWines;
