<p align="center">
  <img src="https://img.shields.io/badge/MERN-Stack-green?style=for-the-badge" alt="MERN Stack" />
  <img src="https://img.shields.io/badge/Architecture-MVC%20%2B%20Feature--Based-blue?style=for-the-badge" alt="Architecture" />
  <img src="https://img.shields.io/badge/Auth-JWT-orange?style=for-the-badge" alt="JWT Auth" />
  <img src="https://img.shields.io/badge/Database-MongoDB-darkgreen?style=for-the-badge" alt="MongoDB" />
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="License" />
</p>

# 🛡️ Amber Safety Enterprises — Full-Stack E-Commerce Platform

> A production-ready, full-stack **MERN** e-commerce application for industrial safety products — built with **domain-driven architecture**, **JWT authentication with email verification**, and **role-based access control**.

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Authentication Flow](#-authentication-flow)
- [Architecture & Folder Structure](#-architecture--folder-structure)
- [Installation Guide](#-installation-guide)
- [Environment Variables](#-environment-variables)
- [API Endpoints Overview](#-api-endpoints-overview)
- [Screenshots](#-screenshots)
- [Future Improvements](#-future-improvements)
- [Contributing](#-contributing)
- [Author](#-author)

---

## 🚀 Project Overview

**Amber Safety Enterprises** is a comprehensive e-commerce platform specializing in industrial safety equipment. The application follows a **domain-driven, MVC + feature-based architecture** ensuring clean separation of concerns, scalability, and maintainability.

### Key Highlights

- 🔐 **Secure JWT Authentication** with Gmail-based email verification links
- 👥 **Role-Based Access Control** — User, Seller, Admin
- 🏗️ **Domain-Driven Architecture** — Modular, scalable, and maintainable
- 🛒 **Full E-Commerce Flow** — Browse → Cart → Checkout
- 📦 **Product Management** — CRUD with image uploads
- 📧 **Transactional Emails** — Verification & notifications via Nodemailer

---

## 🛠️ Tech Stack

| Layer        | Technology                                                    |
| ------------ | ------------------------------------------------------------- |
| **Frontend** | React.js, Vite, Context API, React Router, Tailwind CSS       |
| **Backend**  | Node.js, Express.js, REST API                                 |
| **Database** | MongoDB, Mongoose ODM                                         |
| **Auth**     | JWT (JSON Web Tokens), Bcrypt.js                              |
| **Email**    | Nodemailer (Gmail SMTP)                                       |
| **Upload**   | Multer (multipart/form-data)                                  |
| **DevOps**   | ESLint, Prettier, dotenv, Nodemon                             |

---

## ✨ Features

### 👤 User Features

| Feature                    | Description                                              |
| -------------------------- | -------------------------------------------------------- |
| 📝 Registration            | Sign up with full name, email & password                 |
| ✉️ Email Verification      | JWT-based verification link sent to Gmail                |
| 🔑 Login / Logout          | Secure session with httpOnly JWT cookies or bearer token |
| 🛍️ Browse Products          | View all products organized by category                  |
| 🔍 Product Details          | Detailed product view with images & specifications       |
| 🛒 Cart Management          | Add, update quantity, remove items from cart              |
| 💳 Checkout                 | Complete purchase with shipping details                  |
| 👤 Profile Management       | View and update personal information                     |

### 🏪 Seller / Admin Features

| Feature                    | Description                                              |
| -------------------------- | -------------------------------------------------------- |
| ➕ Add Products             | Create new products with image upload (Multer)           |
| ✏️ Update Products          | Edit product details, pricing, and inventory             |
| 🗑️ Delete Products          | Remove products from the catalog                         |
| 📊 Inventory Management     | Track and manage product stock quantities                |
| 👥 User Management          | Admin oversight of registered users and roles            |
| 📦 Order Management         | View and update order statuses                           |

---

## 🔐 Authentication Flow

```
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
│   User       │     │   Server      │     │   Gmail (SMTP)   │
│   (Client)   │     │   (Express)   │     │                  │
└──────┬───────┘     └──────┬───────┘     └────────┬─────────┘
       │                     │                      │
       │  1. POST /signup    │                      │
       │  (name,email,pass)  │                      │
       │────────────────────►│                      │
       │                     │                      │
       │                     │  2. Hash password    │
       │                     │  3. Save user        │
       │                     │     (verified:false) │
       │                     │                      │
       │                     │  4. Generate JWT     │
       │                     │     verification     │
       │                     │     token            │
       │                     │                      │
       │                     │  5. Send email with  │
       │                     │     verification     │
       │                     │────────────────────► │
       │                     │     link             │
       │                     │                      │
       │  6. Response:       │                      │
       │  "Check your email" │                      │
       │◄────────────────────│                      │
       │                     │                      │
       │  7. User clicks     │                      │
       │     verification    │                      │
       │     link in email   │                      │
       │────────────────────►│                      │
       │                     │                      │
       │                     │  8. Verify JWT token │
       │                     │  9. Set verified:true│
       │                     │                      │
       │  10. "Email         │                      │
       │      verified!"     │                      │
       │◄────────────────────│                      │
       │                     │                      │
       │  11. POST /login    │                      │
       │  (email, password)  │                      │
       │────────────────────►│                      │
       │                     │                      │
       │                     │  12. Validate creds  │
       │                     │  13. Check verified  │
       │                     │  14. Generate JWT    │
       │                     │      access token    │
       │                     │                      │
       │  15. JWT Token +    │                      │
       │      User Data      │                      │
       │◄────────────────────│                      │
       │                     │                      │
       │  16. Authenticated  │                      │
       │      requests with  │                      │
       │      Bearer token   │                      │
       │────────────────────►│                      │
```

---

## 🏗️ Architecture & Folder Structure

The project follows a **domain-driven, MVC + feature-based architecture** where each domain (auth, products, cart, orders) is self-contained with its own routes, controllers, services, and models.
```
amber-enterprises-mern/
│
├── 📁 backend
│
│   ├── 📁 app
│   │   └── app.js                    # Express app initialization
│   │
│   ├── 📁 config
│   │   └── db.js                     # MongoDB connection
│   │
│   ├── 📁 constants
│   │   ├── categories-constant.js
│   │   └── roles-constant.js
│   │
│   ├── 📁 features                  # 🔥 Domain modules
│   │
│   │   ├── 📁 auth
│   │   │   ├── 📁 controllers
│   │   │   │   ├── login-controller.js
│   │   │   │   ├── signup-controllers.js
│   │   │   │   ├── verifyEmail-controller.js
│   │   │   │   ├── resendVerification-controller.js
│   │   │   │   ├── signout-controller.js
│   │   │   │   └── me-controller.js
│   │   │   │
│   │   │   ├── 📁 models
│   │   │   │   └── user-model.js
│   │   │   │
│   │   │   ├── 📁 routes
│   │   │   │   └── auth-routes.js
│   │   │   │
│   │   │   └── 📁 services
│   │   │       ├── existence.js
│   │   │       └── findAndUpdate.js
│   │
│   │   ├── 📁 products
│   │   │   ├── 📁 controllers
│   │   │   │   ├── add-controller.js
│   │   │   │   └── Products-controller.js
│   │   │   │
│   │   │   ├── 📁 models
│   │   │   │   └── product-model.js
│   │   │   │
│   │   │   ├── 📁 routes
│   │   │   │   └── product-routes.js
│   │   │   │
│   │   │   └── 📁 services
│   │
│   │   ├── 📁 cart
│   │   │   ├── controllers
│   │   │   ├── models
│   │   │   ├── routes
│   │   │   └── services
│   │
│   │   ├── 📁 orders
│   │   │   ├── controllers
│   │   │   ├── models
│   │   │   ├── routes
│   │   │   └── services
│   │
│   │   └── 📁 users
│   │       ├── controllers
│   │       ├── models
│   │       ├── routes
│   │       └── services
│
│   ├── 📁 middlewares
│   │   ├── checkDuplicate-middleware.js
│   │   ├── errorHandling-middleware.js
│   │   ├── morgan-middleware.js
│   │   ├── multer-middleware.js
│   │   ├── requireLogin-middleware.js
│   │   └── requireSeller-middleware.js
│
│   ├── 📁 routes
│   │   └── index-routes.js
│
│   ├── 📁 utils
│   │   ├── appError.js
│   │   ├── authToken.js
│   │   ├── catchAsync.js
│   │   ├── logger.js
│   │   ├── mailSender.js
│   │   ├── tokens.js
│   │   └── transporter.js
│
│
├── 📁 frontend
│
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│
│   ├── 📁 api
│   │   └── mainApi.js                # Axios configuration
│
│   ├── 📁 assets
│   │   ├── icons
│   │   └── images
│
│   ├── 📁 components                 # Shared UI components
│   │   ├── 📁 header
│   │   ├── 📁 footer
│   │   ├── 📁 Home
│   │   └── 📁 profile
│
│   ├── 📁 constants
│   │   ├── categories-constant.js
│   │   └── roles-constant.js
│
│   ├── 📁 features                   # 🔥 Feature based frontend
│   │
│   │   ├── 📁 auth
│   │   │   ├── components
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   └── SignUpForm.jsx
│   │   │   └── pages
│   │   │       └── Auth.jsx
│   │
│   │   ├── 📁 products
│   │   │   ├── components
│   │   │   │   ├── ProductCard.jsx
│   │   │   │   └── SingleProduct.jsx
│   │
│   │   ├── 📁 cart
│   │   │   ├── components
│   │   │   │   ├── CartItem.jsx
│   │   │   │   ├── CheckOut.jsx
│   │   │   │   └── EmptyCart.jsx
│   │   │   └── pages
│   │   │       └── Cart.jsx
│   │
│   │   ├── 📁 orders
│   │   │   ├── components
│   │   │   └── pages
│   │
│   │   └── 📁 seller
│   │       ├── components
│   │       │   ├── ProductForm.jsx
│   │       │   └── SellerAnalytics.jsx
│   │       └── pages
│   │           └── Seller.jsx
│
│   ├── 📁 hooks
│   │   ├── useApi.js
│   │   ├── useAuth.js
│   │   ├── useCart.js
│   │   └── useProduct.js
│
│   ├── 📁 store                      # Global state
│   │   ├── AuthContext.jsx
│   │   └── ProductContext.jsx
│
│   ├── 📁 layout
│   │   ├── AuthLayout.jsx
│   │   └── MainLayout.jsx
│
│   ├── 📁 router
│   │   └── pageRoutes.jsx
│
│   ├── 📁 services                   # API calls
│   │   ├── authServices.js
│   │   ├── cartServices.js
│   │   └── productServices.js
│
│   ├── 📁 ui                         # Reusable UI components
│   │   ├── button.jsx
│   │   ├── card.jsx
│   │   ├── input.jsx
│   │   ├── slider.jsx
│   │   └── skeleton.jsx
│
│   └── 📁 utils
│
├── README.md
└── package.json
```
---

## ⚙️ Installation Guide

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v18 or higher) — [Download](https://nodejs.org/)
- **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- **Git** — [Download](https://git-scm.com/)
- **Gmail Account** — for email verification (with App Password enabled)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/amber-safety-enterprises.git
cd amber-safety-enterprises
```

### 2️⃣ Setup Backend

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Configure your .env file (see Environment Variables section)

# Start development server
npm run dev
```

### 3️⃣ Setup Frontend

```bash
# Navigate to client directory (from project root)
cd client

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev
```

### 4️⃣ Access the Application

| Service    | URL                          |
| ---------- | ---------------------------- |
| Frontend   | `http://localhost:5173`       |
| Backend    | `http://localhost:5000`       |
| API Base   | `http://localhost:5000/api`   |

---

## 🔑 Environment Variables

### Backend (`server/.env`)

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/amber-safety

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d
JWT_VERIFY_EXPIRE=24h

# Email (Gmail SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password

# Client URL (for verification links)
CLIENT_URL=http://localhost:5173
```

### Frontend (`client/.env`)

```env
VITE_API_URL=http://localhost:5000/api
```

> ⚠️ **Important:** Never commit `.env` files to version control. They are included in `.gitignore`.

---

## 📡 API Endpoints Overview

### 🔐 Authentication — `/api/auth`

| Method | Endpoint              | Description                  | Auth Required |
| ------ | --------------------- | ---------------------------- | ------------- |
| POST   | `/api/auth/signup`    | Register a new user          | ❌             |
| POST   | `/api/auth/login`     | Login & receive JWT token    | ❌             |
| GET    | `/api/auth/verify/:token` | Verify email via JWT link | ❌             |
| POST   | `/api/auth/logout`    | Logout & clear session       | ✅             |
| GET    | `/api/auth/me`        | Get current user profile     | ✅             |

### 📦 Products — `/api/products`

| Method | Endpoint               | Description                  | Auth Required  |
| ------ | ---------------------- | ---------------------------- | -------------- |
| GET    | `/api/products`        | Get all products             | ❌              |
| GET    | `/api/products/:id`    | Get single product           | ❌              |
| POST   | `/api/products`        | Create new product           | ✅ Seller/Admin |
| PUT    | `/api/products/:id`    | Update product               | ✅ Seller/Admin |
| DELETE | `/api/products/:id`    | Delete product               | ✅ Seller/Admin |

### 🛒 Cart — `/api/cart`

| Method | Endpoint               | Description                  | Auth Required |
| ------ | ---------------------- | ---------------------------- | ------------- |
| GET    | `/api/cart`            | Get user's cart               | ✅             |
| POST   | `/api/cart`            | Add item to cart              | ✅             |
| PUT    | `/api/cart/:itemId`    | Update item quantity          | ✅             |
| DELETE | `/api/cart/:itemId`    | Remove item from cart         | ✅             |
| DELETE | `/api/cart`            | Clear entire cart             | ✅             |

### 📋 Orders — `/api/orders`

| Method | Endpoint               | Description                  | Auth Required  |
| ------ | ---------------------- | ---------------------------- | -------------- |
| POST   | `/api/orders`          | Place a new order             | ✅              |
| GET    | `/api/orders`          | Get user's orders             | ✅              |
| GET    | `/api/orders/:id`      | Get order details             | ✅              |
| PUT    | `/api/orders/:id`      | Update order status           | ✅ Seller/Admin |

---

## 📸 Screenshots

<p align="center">
  <em>🏠 Home Page</em><br/>
  <img src="docs/screenshots/home.png" alt="Home Page" width="800" />
</p>

<p align="center">
  <em>🛍️ Products Page</em><br/>
  <img src="docs/screenshots/products.png" alt="Products Page" width="800" />
</p>

<p align="center">
  <em>🛒 Shopping Cart</em><br/>
  <img src="docs/screenshots/cart.png" alt="Cart Page" width="800" />
</p>

> 💡 *Add your own screenshots to `docs/screenshots/` directory*

---

## 🔮 Future Improvements

- [ ] 🔍 **Full-text search** with Elasticsearch or MongoDB Atlas Search
- [ ] 💳 **Payment gateway integration** (Razorpay / Stripe)
- [ ] 📱 **Progressive Web App (PWA)** support
- [ ] 📊 **Analytics dashboard** for sellers with sales charts
- [ ] 🌐 **Multi-language support** (i18n)
- [ ] ⭐ **Product reviews & ratings** system
- [ ] 📬 **Order tracking** with real-time status updates
- [ ] 🔔 **Push notifications** for order updates
- [ ] 🧪 **Unit & integration tests** with Jest & React Testing Library
- [ ] 🐳 **Docker containerization** for easy deployment
- [ ] 🚀 **CI/CD pipeline** with GitHub Actions

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

Please make sure to update tests as appropriate and follow the existing code style.

---

## 👨‍💻 Author

**Your Name**

- GitHub: [@Hemant-kkr](https://github.com/Hemant-kkr/)
- LinkedIn: [Hemant Kumar](www.linkedin.com/in/hemant-166240269)
- Email: hemant.sindhyan.dev@gmail.com
---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Made with ❤️ and ☕ by <strong>Hemant Kumar</strong>
</p>

<p align="center">
  ⭐ Star this repo if you found it helpful!
</p>
