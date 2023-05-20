const { execSync } = require("child_process");
const [operation, migrationName] = process.argv.slice(2);
const dataSourcePath = `-d ./src/shared/infra/typeorm/`;
const migrationsPath = `./src/shared/infra/typeorm/migrations/${migrationName} `;
let npxCommand = `npx ts-node-dev -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:${operation} `;

if (operation === "generate") {
  npxCommand += migrationsPath + dataSourcePath;
} else if (operation === "create") {
  npxCommand += migrationsPath;
} else {
  npxCommand += dataSourcePath;
}

try {
  execSync(npxCommand, {
    stdio: "inherit",
  });
} catch (e) {
  console.log(e);
}
