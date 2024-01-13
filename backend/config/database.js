import Sequelize from "sequelize";
import fs from "fs";
import path from "path";

let db = new Sequelize("", "root", "root", {
  host: "database-service",
  port: 3306,
  dialect: "mysql",
});

db.query("SHOW DATABASES LIKE 'ecommerce';").then(([results]) => {
  if (results.length === 0) {
    // Database doesn't exist, run the SQL file
    const sqlFilePath = path.join(__dirname, "path_to_your_sql_file.sql");
    const queries = fs.readFileSync(sqlFilePath, "utf8");

    db.query(queries).then(() => {
      db = new Sequelize("ecommerce", "root", "root", {
        host: "database-service",
        port: 3306,
        dialect: "mysql",
      });
    });
  } else {
    // Database exists, just connect to it
    db = new Sequelize("ecommerce", "root", "root", {
      host: "database-service",
      port: 3306,
      dialect: "mysql",
    });
  }
});
export default db;