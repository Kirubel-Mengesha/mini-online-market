# Mini Online Market

Welcome to the Mini Online Market! This project is a proof of concept for a full-stack web application using **Spring Boot** and **React**. The application enables **Admins**, **Sellers**, and **Buyers** to interact in a digital marketplace.

## Features

### Admin
- Approve seller registrations.
- Manage and delete inappropriate reviews.

### Seller
- Register as a seller.
- Perform CRUD operations on products (cannot delete purchased items).
- Maintain orders and manage statuses (Shipped, On the Way, Delivered).
- View product inventory with stock status.

### Buyer
- Register as a buyer.
- Add and manage a shopping cart.
- Place and manage orders.
- View order history and download receipts (PDF/Excel).
- Write product reviews.

### General
- Secure authentication with **JWT** (no unauthorized page access).
- Email notifications for purchases.
- Validation for all form submissions.
- Lazy loading for product pages.
- Filters for product categories, price ranges, brands, and more.

## Technical Details

### Backend
- Framework: **Spring Boot**
- Database: **MySQL**
- Security: JWT-based authentication.

### Frontend
- Framework: **React**
- Styling: **CSS**
- UI: Individual seller pages, product filters, and dynamic loading.

### Deployment
- Backend: To be deployed on a suitable application server (e.g., Tomcat).
- Frontend: To be deployed on a static hosting service (e.g., Netlify, Vercel).

## Pre-populated Data
The database includes:
- Default categories, subcategories, and filters for products.
- Sample users (Admin, Seller, Buyer) with test credentials.

## Installation Guide

### Prerequisites
- **Java 17+**
- **Node.js 18+**
- **MySQL Server**
- **Maven** (for backend dependencies)
