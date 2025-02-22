import "reflect-metadata";
import { AppDataSource } from "../data-source"; // Import the AppDataSource
import { CategorySeeder } from "./CategorySeeder"; // Import the CategorySeeder
import { UserSeeder } from "./UserSeeder"; // Import the UserSeeder

// Initialize the DataSource (AppDataSource)
const startSeeding = async () => {
    console.log("Connecting to database...");
    try {
        await AppDataSource.initialize(); // Connect to DB
        console.log("Database connected!");

        // Seeding categories
        console.log("Seeding categories...");
        await CategorySeeder.seed(AppDataSource); // Pass AppDataSource to CategorySeeder

        // Seeding users
        console.log("Seeding users...");
        await UserSeeder.seed(AppDataSource); // Pass AppDataSource to UserSeeder

    } catch (error) {
        console.error("Seeding error:", error);
    } finally {
        await AppDataSource.destroy(); // Close the DB connection
    }
};

startSeeding();
