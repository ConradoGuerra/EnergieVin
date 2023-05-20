import "reflect-metadata";
import { DataSource } from "typeorm";
export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "admin",
  password: "admin",
  database: "energieVin",
  entities: ["./src/modules/**/infra/typeorm/entities/*.{ts,js}"],
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
  synchronize: true,
  logging: false,
});
