I understand completely. You want **one single, clean Markdown block** that contains **everything** (including the sections on Credentials, TDD, AI Usage, and Screenshots) properly formatted, so you can just copy-paste it once and it will look perfect.

Here is the **complete, fully formatted README.md** file:

````markdown
# 🍬 Sweet Shop Management System

A full-stack Sweet Shop Management System built with the **MERN Stack** (MongoDB, Express, React, Node.js) following strictly **Test-Driven Development (TDD)** principles.

This project demonstrates a robust RESTful API, secure JWT authentication, and a responsive frontend with Admin management capabilities.

## 🚀 Features

### Core Functionality
- **User Authentication:** Secure Register & Login using **JWT (JSON Web Tokens)**.
- **Product Management:** View all sweets with real-time stock levels.
- **Search & Filter:** Instant search for sweets by name or category.
- **Inventory System:** Purchase logic that automatically decreases stock quantity.
- **Security:** Protected routes ensuring only authenticated users can access shop features.

### 👑 Admin Features (Protected)
- **Role-Based Access Control:** Special permissions for Admin users.
- **Dashboard:** Specialized UI for managing inventory.
- **CRUD Operations:** Add, Update, and Delete sweets.
- **Restocking:** Quick "Restock" action to replenish inventory.

---

## 🛠️ Tech Stack

**Backend:**
- **Node.js & Express:** For the REST API.
- **MongoDB & Mongoose:** For database and schema modeling.
- **JWT & Bcrypt:** For security and authentication.
- **Jest & Supertest:** For TDD (Test-Driven Development) and API testing.

**Frontend:**
- **React (Vite):** Fast, modern frontend framework.
- **Tailwind CSS:** For responsive and modern styling.
- **Axios:** For API communication.
- **React Context API:** For global state management (Auth).

---

## ⚙️ Installation & Setup

Follow these steps to set up the project locally.

### 1. Clone the Repository
```bash
git clone <your-repo-link-here>
cd sweet-shop-management
````

### 2\. Backend Setup

Navigate to the backend folder and install dependencies.

```bash
cd backend
npm install
```

**Configure Environment Variables:**
Create a `.env` file in the `backend/` folder and add the following:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/sweetshop
JWT_SECRET=your_super_secret_key_123
```

**Seed the Database (Important\!):**
Run this command to clear the DB and create the initial Admin user and sample sweets.

```bash
npm run data:import
```

**Start the Server:**

```bash
npm run dev
```

*Server should be running on http://localhost:5000*

### 3\. Frontend Setup

Open a new terminal, navigate to the frontend folder, and install dependencies.

```bash
cd ../my-app
npm install
```

**Start the React App:**

```bash
npm run dev
```

*Frontend should be running on http://localhost:5173*

-----

## 🔐 Test Credentials

Use these pre-configured accounts to test the application logic:

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@sweetshop.com` | `password123` | **Full Access** (Add/Edit/Delete Sweets) |
| **User** | `user@sweetshop.com` | `password123` | **Customer Access** (View, Search, Buy) |

-----

## 🧪 Running Tests (TDD)

This project was built using **Test-Driven Development**. You can verify the backend logic by running the comprehensive test suite.

```bash
cd backend
npm test
```

**Expected Output:**

  - ✅ Auth Tests (Register/Login)
  - ✅ Sweets Tests (CRUD Operations)
  - ✅ Inventory Tests (Purchase/Restock Logic)
  - ✅ Security Tests (Protected Routes)

-----

## 🤖 My AI Usage

*As per the assignment requirements, here is a transparency report on AI tools used during development.*

**AI Tools Used:**

  - **Gemini (Google):** Used as a pair programmer and thought partner.

**How I Used Them:**

1.  **Boilerplate Generation:** I used AI to generate the initial project structure for Vite and Express to save setup time.
2.  **TDD Workflow:** I asked the AI to help write the "Red" (failing) tests for the API endpoints first, ensuring I followed strict TDD practices before writing the controller logic.
3.  **Debugging:** When encountering MongoDB connection errors during testing, I used AI to identify missing environment variable configurations in Jest.
4.  **Refactoring:** Used AI to suggest cleaner ways to handle the "Admin" middleware logic.

**Reflection:**
Using AI significantly sped up the boilerplate phase, allowing me to focus on the complex business logic (inventory management). It acted as a strict "Test" reviewer, ensuring my test coverage was complete before I moved to implementation.

-----

## 📸 Screenshots

*(Place your screenshots here in the repository and link them)*

| Dashboard | Admin Panel |
| :---: | :---: |
|  |  |

-----

**Author:** [Your Name]

```
```