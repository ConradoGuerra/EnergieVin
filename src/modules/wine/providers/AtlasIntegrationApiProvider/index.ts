import { container } from "tsyringe";
import { IWineDataApiProvider } from "./models/IWineDataApiProvider";
import AtlasIntegrationApiProvider from "./implementations/AtlasIntegrationApiProvider";

container.registerSingleton<IWineDataApiProvider>(
  "AtlasIntegrationApiProvider",
  AtlasIntegrationApiProvider
);
