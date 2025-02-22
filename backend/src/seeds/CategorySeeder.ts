import { DataSource } from "typeorm";
import { Category } from "categories/categories.entity"; // Import the Category entity

export class CategorySeeder {
    static async seed(dataSource: DataSource) {
        const categoryRepository = dataSource.getRepository(Category);
        // await dataSource.query('TRUNCATE TABLE categories');
        const categories = [
            { name: 'Electronics', slug: 'electronics', type: 'Main', is_active: true },
            { name: 'Fashion', slug: 'fashion', type: 'Main', is_active: true },
            { name: 'Home & Furniture', slug: 'home-furniture', type: 'Main', is_active: true },
            { name: 'Books', slug: 'books', type: 'Main', is_active: true },
            { name: 'Sports & Fitness', slug: 'sports-fitness', type: 'Main', is_active: true },
        ];

        for (const category of categories) {
            // Check if category exists
            let existingCategory = await categoryRepository.findOne({
                where: { name: category.name },
            });

            if (existingCategory) {
                // Update the existing category
                existingCategory.slug = category.slug;
                existingCategory.type = category.type;
                existingCategory.is_active = category.is_active;
                await categoryRepository.save(existingCategory);
                console.log(`✅ Category '${category.name}' updated successfully!`);
            } else {
                // Create a new category
                const newCategory = categoryRepository.create(category);
                await categoryRepository.save(newCategory);
                console.log(`✅ Category '${category.name}' created successfully!`);
            }
        }
    }
}
