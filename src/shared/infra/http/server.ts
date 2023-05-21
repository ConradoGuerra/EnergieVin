import { AppDataSource } from "../typeorm";
import app from "./app";

AppDataSource.initialize()
  .then(() => {
    console.log("Database running");
    app.listen(3333, () => {
      console.log("Server running on port 3333");
    });
  })
  .catch(err => {
    console.error("Error during Database initialization", err);
  });
