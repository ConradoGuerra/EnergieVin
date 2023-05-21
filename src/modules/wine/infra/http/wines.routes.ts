import BulkCreateWinesController from "@modules/wine/useCases/bulkCreateWine/BulkCreateWineController";
import GetWinePricesController from "@modules/wine/useCases/getWinePrices/GetWinePricesController";

import { Router } from "express";
const bulkCreateWinesController = new BulkCreateWinesController();
const getWinePricesController = new GetWinePricesController();

const wines = Router();
wines.get("/bulk-create", bulkCreateWinesController.handle);
wines.get("/prices/:wineId", getWinePricesController.handle);

export default wines;
