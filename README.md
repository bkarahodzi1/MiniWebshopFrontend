# 🛍️ Mini Webshop Frontend

A responsive webshop frontend built with **React.js** and **Tailwind CSS**, providing a clean shopping experience for customers and a dashboard for admins to manage products and orders.

---

## ⚙️ Tech Stack

- **Framework**: React.js (Vite)
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Routing**: React Router
- **API Integration**: Axios + RESTful API

---

## ✨ Features

### 🛒 Guest (Customer) Interface

- **Home Page**: View all available products with filtering and sorting options
- **Product Details Page**: See product image, description, quantity, price
- **Cart Page**: Add, update, and remove items from cart
- **Order Page**: Enter customer details and confirm order

### 🛠️ Admin Dashboard

- **Login Page**: Authenticate with username and password
- **Dashboard Navigation**: Home, Settings, Logout
- **Product List**: Filter, sort, and view all products
- **Add Product**: Submit name, description, image URL, quantity, price
- **Edit/Delete Product**: Update or remove existing products
- **Orders Page**: View all orders with pagination and sort by date
- **Order Details**: View and update order status (Accepted, Rejected, Completed)

---

## 📱 Responsiveness

The application is fully responsive and works smoothly on:

- ✅ Mobile devices
- ✅ Tablets
- ✅ Desktop computers

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/webshopfrontend.git
cd webshopfrontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Environment Variables

Create a `.env` file in the root of the project:

```env
VITE_API_URL=https://miniwebshopapi.onrender.com
# or for local development:
# VITE_API_URL=http://localhost:8000
```

### 4. Start the Development Server

```bash
npm run dev
```

The app will be running on [http://localhost:5173](http://localhost:5173) by default.

---

## 🧪 Folder Structure

```
webshopfrontend/
├── public/
├── src/
│   ├── components/
│   ├── contexts/
│   ├── pages/
│   ├── routes/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── .env
├── package.json
└── tailwind.config.js
```

---

## 🔗 Live Demo

- Frontend: [https://your-frontend-url.com](https://your-frontend-url.com)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
