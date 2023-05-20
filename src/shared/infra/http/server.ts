import { AppDataSource } from "../typeorm";
import app from "./app";

AppDataSource.initialize()
  .then(() => {
    console.log("Database running");
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch(err => {
    console.error("Error during Database initialization", err);
  });
