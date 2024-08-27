# MechArcade

## Introduction

Welcome to `MechArcade`, your premier destination for mechanical keyboards. Whether you're a gaming enthusiast, a coding maestro, or a productivity guru, `MechArcade` offers the perfect keyboard to suit your needs.

## Table of Contents

- [MechArcade](#mecharcade)
  - [Introduction](#introduction)
  - [Table of Contents](#table-of-contents)
  - [Project Description](#project-description)
    - [Purpose and Goals](#purpose-and-goals)
  - [Features](#features)
    - [Homepage](#homepage)
    - [Products Page](#products-page)
    - [Product Details Page](#product-details-page)
    - [Cart Page](#cart-page)
    - [Checkout Page](#checkout-page)
    - [Product Management/Dashboard](#product-managementdashboard)
    - [About Us Page](#about-us-page)
    - [Contact Us Page](#contact-us-page)
    - [Others Features](#others-features)
  - [Technology Stack](#technology-stack)
  - [Installation Guideline](#installation-guideline)
    - [Prerequisites](#prerequisites)
    - [Frontend Installation](#frontend-installation)
    - [Backend Installation](#backend-installation)
    - [Configuration](#configuration)
      - [Frontend](#frontend)
      - [Backend](#backend)
  - [Usage](#usage)
      - [Frontend](#frontend-1)
      - [Backend](#backend-1)
  - [Contributing](#contributing)

## Project Description

`MechArcade` is an innovative e-commerce platform dedicated to delivering an exceptional shopping experience for mechanical keyboard enthusiasts. Our website features a sleek and intuitive design, offering seamless navigation and robust functionality. Key highlights include:

-   **Homepage**: A captivating entry point showcasing featured products and top brands.
-   **Product Pages**: Detailed listings with comprehensive descriptions, customer reviews, and purchasing options.
-   **Cart and Checkout**: A streamlined process for adding items to cart, managing quantities, and secure checkout with payment integration.
-   **Admin Dashboard**: Tools for product management, including inventory control, updates, and analytics.
-   **About Us and Contact Us**: Pages providing insights into our mission, team, and ways to connect.

### Purpose and Goals

The primary purpose of `MechArcade` is to provide mechanical keyboard enthusiasts with a dedicated online platform where they can easily browse and purchase mechanical keyboards and accessories. Our goals are:

-   To offer a comprehensive and user-friendly shopping experience.
-   To provide robust tools for administrators to manage products efficiently.
-   To ensure secure transactions with optional Stripe integration.
-   To create a responsive and aesthetically pleasing website that enhances user interaction.

## Features

-   **Responsive Design**: Optimized for all devices.
-   **User-Friendly Interface**: Intuitive navigation and clean design.

### Homepage

-   **Service Ads**: Free shipping, 24/7 support.
-   **Featured Products**: Latest 6 products.
-   **Top Brands**: Popular brand logos.
-   **Customer Reviews**: Testimonials carousel.
-   **Extra Sections**: Insights on mechanical keyboards.

### Products Page

-  Product Listings: View all products with images, names, and prices.
-  Search & Filters: Find products by name, brand and price range.
-  Sorting Options: Sort products by price.

### Product Details Page

-   Detailed Info: View product specs, images, and reviews.
-   Add-to-Cart: Easily add items to the cart with stock updates..

### Cart Page

-   Cart Management: Adjust quantities or remove items.
-   Pricing Overview: See subtotal, taxes, and total cost.

### Checkout Page

-   User Details: Enter shipping info and choose payment methods.
-   Payment Options: Includes Cash on Delivery and Stripe.

### Product Management/Dashboard

-   Manage Product: Manage products with add, update, and delete options.
-   Product Table: View and edit all products in real-time..

### About Us Page

-   Brand Story: Learn about the mission and team with engaging design.

### Contact Us Page

-   Contact Info: Find ways to reach out and an interactive form for inquiries.

### Others Features

-   **Debounce API Calls**: Efficient search functionality.
-   **Page Refresh Warning**: Prevents cart data loss.
-   **Animations**: Enhances user interaction.
-   **Stripe Payment Integration**: Secure payment processing.
-   **Pagination**: Custom pagination on the Products page.

## Technology Stack

-   **Frontend**: `React` with `Vite` for building an interactive and high-performance user interface.
-   **State Management**: `Redux` and `RTK Query` for managing application state and server data efficiently.
-   **Backend**: `Node.js` and `Express.js` for building a robust server-side application.
-   **Database**: `MongoDB` with `Mongoose` for efficient data storage and retrieval.
-   **Authentication**: `JSON Web Tokens (JWT)` for secure user authentication and authorization.
-   **Validation**: `Zod` for schema validation and ensuring data integrity.
-   **TypeScript**: Enhancing codebase maintainability and scalability with statically typed `JavaScript`.

## Installation Guideline

### Prerequisites

-   **Node.js**
-   **MongoDB**
-   **Yarn or npm**

### Frontend Installation

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/nirjhorsaha/mechArcade-frontend.git
    cd mecharcade-frontend
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Create a `.env` file** in the root directory and add necessary configuration variables:

    ```bash
    VITE_API_URL=http://localhost:5173/
    ```

4.  **Start the development server**:

    ```bash
    npm run dev
    ```

5.  **Build the project for production**:

    ```bash
    npm run build
    ```

### Backend Installation

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/nirjhorsaha/mechArcade-backend.git
    cd mecharcade-backend
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Create a `.env` file** in the root directory and add necessary configuration variables:

    ```bash
    PORT = 5000
    DB_URL = <your_mongodb_connection_uri>
    JWT_SECRET = <your_jwt_secret>
    ```

4.  **Start the development server**:

    ```bash
    npm run dev
    ```

### Configuration

#### Frontend

1.  **Environment Variables**: Ensure the `.env` file has the correct API URL:

    ```bash
    VITE_API_URL=http://localhost:5000/api
    ```

#### Backend

1.  **Environment Variables**: Ensure the `.env` file has the correct configuration:

    ```bash
    PORT=5000
    DB_URL=your_mongodb_connection_uri
    JWT_SECRET=your_jwt_secret
    ```

## Usage

#### Frontend

Once the development server is running, you can access the frontend at `http://localhost:5000`. Navigate through the website to explore different pages and features.

#### Backend

With the backend server running, it will listen on the port specified in the `.env` file. Use the API endpoints to interact with the database and perform CRUD operations.

## Contributing

Contributions are welcome.! If you'd like to contribute to this project, please follow these steps:

-   Fork the repository.
-   Create your feature branch: `git checkout -b feature-name`.
-   Commit your changes: `git commit -m 'Add some feature'`.
-   Push to the branch: `git push origin feature-name`.
-   Submit a pull request.
