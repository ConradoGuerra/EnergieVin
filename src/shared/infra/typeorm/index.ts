import User from "@modules/user/infra/typeorm/entities/User";
import Wine from "@modules/wine/infra/typeorm/entities/Wine";
import WinePrice from "@modules/wine/infra/typeorm/entities/WinePrice";
import WineProperty from "@modules/wine/infra/typeorm/entities/WineProperty";
import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "admin",
  password: "admin",
  database: "energieVin",
  entities: [Wine, WinePrice, WineProperty, User],
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
  synchronize: true,
  logging: true,
});
