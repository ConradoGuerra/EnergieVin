import BulkCreateWinesController from "@modules/wine/useCases/bulkCreateWine/BulkCreateWineController";
import GetWineController from "@modules/wine/useCases/getWine/GetWineController";
import GetWinePricesController from "@modules/wine/useCases/getWinePrices/GetWinePricesController";
import GetWinesController from "@modules/wine/useCases/getWines/GetWinesController";
import { Router } from "express";

const bulkCreateWinesController = new BulkCreateWinesController();
const getWinePricesController = new GetWinePricesController();
const getWinesController = new GetWinesController();
const getWineController = new GetWineController();

const wines = Router();
wines.get("/", getWinesController.handle);
wines.get("/:wineId", getWineController.handle);
wines.post("/bulk-create", bulkCreateWinesController.handle);
wines.get("/prices/:wineId", getWinePricesController.handle);

export default wines;
