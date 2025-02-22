import { DataSource } from "typeorm";
import { User } from "users/users.entity"; // Import the User entity
import bcrypt from "bcrypt"; // Import bcrypt for password hashing

export class UserSeeder {
    static async seed(dataSource: DataSource) {
        const userRepository = dataSource.getRepository(User);
        // Define user data
        const users = [
            { first_name: 'Muhammad', last_name: 'Hannan', email: 'sysadmin44@yopmail.com', password: 'Test@1234', can_login: true, image: null },
            { first_name: 'Jane', last_name: 'Doe', email: 'jane_doe@yopmail.com', password: 'Test@1234', can_login: true, image: null },
            { first_name: 'Mike', last_name: 'Smith', email: 'mike_smith@yopmail.com', password: 'Test@1234', can_login: true, image: null },
            { first_name: 'Sara', last_name: 'Johnson', email: 'sara_johnson@yopmail.com', password: 'Test@1234', can_login: true, image: null },
            { first_name: 'Tom', last_name: 'Williams', email: 'tom_williams@yopmail.com', password: 'Test@1234', can_login: true, image: null },
        ];

        for (const user of users) {
            // Hash the password before saving
            const hashedPassword = await bcrypt.hash(user.password, 10); // 10 is the salt rounds

            // Check if user exists
            let existingUser = await userRepository.findOne({
                where: { email: user.email },
            });

            if (existingUser) {
                // Update the existing user with hashed password
                existingUser.first_name = user.first_name;
                existingUser.last_name = user.last_name;
                existingUser.password = hashedPassword;
                existingUser.can_login = user.can_login;
                existingUser.image = user.image;
                await userRepository.save(existingUser);
                console.log(`✅ User '${user.first_name} ${user.last_name}' updated successfully!`);
            } else {
                // Create a new user with hashed password
                const newUser = userRepository.create({ ...user, password: hashedPassword });
                await userRepository.save(newUser);
                console.log(`✅ User '${user.first_name} ${user.last_name}' created successfully!`);
            }
        }
    }
}
