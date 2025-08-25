# flameOn 🍔 — MERN Food Ordering App

A modern **MERN** app for browsing dishes, adding to cart, applying promos/taxes, placing orders, and managing status in a full **Admin Dashboard**. Built with a responsive, mobile-first UI.

---

## ✨ Features

- 🔐 **Auth**: Email/password, Google Sign-In, OTP verification, forgot/reset password  
- 🍽️ **Menu**: Category chips, search, sort, Swiggy-style responsive cards  
- 🛒 **Cart/Checkout**: Quantity controls, promo code, GST calculation  
- 👤 **Profile**: Info, order history, loyalty tier, account settings  
- 🛠️ **Admin**: Products, categories, users (promote/demote), orders (status workflow)  
- 📱 **Responsive UI**: Mobile, tablet, desktop (Tailwind + React Icons)

---

## 🧱 Tech Stack

**Frontend**
- `react@^19.1.1`, `react-dom@^19.1.1`
- `react-router-dom@^7.8.0`
- `axios@^1.11.0`
- `zustand@^5.0.7`
- `react-icons@^5.5.0`
- `firebase@^12.1.0`

**Backend**
- `express@^5.1.0`, `cors@^2.8.5`, `dotenv@^17.2.1`
- `mongodb@^6.18.0`, `mongoose@^8.17.1`
- `jsonwebtoken@^9.0.2`, `bcryptjs@^3.0.2`
- `multer@^2.0.2` (uploads), `nodemailer@^7.0.5` (emails)
- `firebase-admin@^13.4.0` (OTP/Google)
- `razorpay@^2.9.6` (optional payments)

---

##🚀 Quick Start (Development)

   Clone the Repository

1) Client
```bash
cd client
npm install
npm run dev
```

2) Server
```bash
cd server
npm install
npm start
```
   






