# Open Source E-Commerce Project with NestJS and Next.js

Welcome to the Open Source E-Commerce Project! This project is a modern, scalable, and fully customizable e-commerce platform built using **NestJS** for the backend and **Next.js** for the frontend. Whether you're a developer looking to contribute, a business owner seeking a customizable solution, or a learner exploring full-stack development, this project is for you!

## Features

- **Backend (NestJS):**
  - RESTful API with TypeScript
  - Authentication and Authorization (JWT, OAuth2)
  - Database integration (MySQL)
  - Product, Order, and User management
  - Payment gateway integration (Stripe, PayPal, etc.)
  - Caching and rate limiting
  - Unit and integration testing
  - API documentation with **Swagger**

- **Frontend (Next.js):**
  - Server-side rendering (SSR) and static site generation (SSG)
  - Responsive and modern UI design
  - Product catalog, search, and filtering
  - Shopping cart and checkout flow
  - User profile and order history
  - SEO optimization

## Getting Started

Follow these steps to set up the project locally:

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MySQL database

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/ecommerce-project.git
   cd ecommerce-project
   ```

2. **Install dependencies:**
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the `backend` folder and add the following:
     ```env
     DATABASE_URL=mysql://username:password@localhost:3306/database_name
     JWT_SECRET=your_jwt_secret
     STRIPE_SECRET_KEY=your_stripe_secret_key
     ```
   - Create a `.env.local` file in the `frontend` folder and add the following:
     ```env
     NEXT_PUBLIC_API_URL=http://localhost:3000
     ```

4. **Run MySQL database:**
   Ensure MySQL is installed and running. You may need to create the database manually:
   ```sql
   CREATE DATABASE ecommerce_db;
   ```

5. **Run database migrations:**
   ```bash
   cd backend
   npm run migration:run
   ```

6. **Run the backend:**
   ```bash
   cd backend
   npm run start:dev
   ```

7. **Run the frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

8. **Access the application:**
   - Backend: `http://localhost:3000`
   - Frontend: `http://localhost:3001`
   - API Documentation (Swagger): `http://localhost:3000/api`

## Contributing

We welcome contributions from the community! Here's how you can help:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes with clear and descriptive messages.
4. Submit a pull request.

Please read our [Contribution Guidelines](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, feel free to open an issue on GitHub or reach out to us at [mdhannan.info@gmail.com](mailto:mdhannan.info@gmail.com).

## Acknowledgments

- [NestJS](https://nestjs.com) for the powerful backend framework.
- [Next.js](https://nextjs.org) for the amazing frontend framework.
- [Swagger](https://swagger.io) for API documentation.
- All contributors and supporters of this project.

---

Happy coding! 🚀
