import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./users/users.entity";  
import { Category } from "./categories/categories.entity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "open_ecommerce",
  synchronize: false, 
  logging: true, 
  entities: [Category, User],  
  migrations: [__dirname + "/migrations/*.ts"],
  subscribers: [],
});


AppDataSource.initialize()
  .then(() => {
    console.log("Database connected!");
  })
  .catch((error) => {
    console.log("Error connecting to the database", error);
  });