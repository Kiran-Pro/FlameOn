# FlameOn 🍔 — MERN Food Ordering App

A modern **MERN** food ordering application featuring an interactive menu, secure authentication, smooth checkout with Razorpay, and a complete **Admin Dashboard** for managing products, users, and orders.  
Designed with a **responsive, mobile-first UI** for the best Swiggy-style experience.

---

## ✨ Features

- 🔐 **Authentication**
  - Email/Password with JWT  
  - Google Sign-In via Firebase  
  - OTP Verification, Forgot & Reset Password  

- 🍽️ **Menu**
  - Category filters, search & sorting  
  - Swiggy-style responsive product cards  

- 🛒 **Cart & Checkout**
  - Quantity controls  
  - Promo code with discounts  
  - GST calculation  
  - Razorpay payment integration  

- 👤 **Profile**
  - User info & account settings  
  - Order history with loyalty tier system  

- 🛠️ **Admin Dashboard**
  - CRUD operations for Products & Categories  
  - Manage Users (promote/demote)  
  - Manage Orders with live status updates  

- 📱 **Responsive UI**
  - Optimized for mobile, tablet, and desktop  
  - Built with Tailwind CSS & React Icons  

---

## 🛠️ Tech Stack

**Frontend**
- [`react@^19.1.1`](https://react.dev) + [`react-dom@^19.1.1`](https://react.dev)  
- [`react-router-dom@^7.8.0`](https://reactrouter.com)  
- [`axios@^1.11.0`](https://axios-http.com)  
- [`zustand@^5.0.7`](https://github.com/pmndrs/zustand)  
- [`react-icons@^5.5.0`](https://react-icons.github.io/react-icons)  
- [`firebase@^12.1.0`](https://firebase.google.com)  

**Backend**
- [`express@^5.1.0`](https://expressjs.com) + [`cors@^2.8.5`](https://www.npmjs.com/package/cors)  
- [`dotenv@^17.2.1`](https://www.npmjs.com/package/dotenv)  
- [`mongodb@^6.18.0`](https://www.mongodb.com) + [`mongoose@^8.17.1`](https://mongoosejs.com)  
- [`jsonwebtoken@^9.0.2`](https://www.npmjs.com/package/jsonwebtoken) + [`bcryptjs@^3.0.2`](https://www.npmjs.com/package/bcryptjs)  
- [`multer@^2.0.2`](https://www.npmjs.com/package/multer) (uploads)  
- [`nodemailer@^7.0.5`](https://nodemailer.com) (emails)  
- [`firebase-admin@^13.4.0`](https://firebase.google.com/docs/admin/setup)  
- [`razorpay@^2.9.6`](https://razorpay.com/docs) (payments)  

## Quick Start 

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

3) Setup your .env files for both client and server

Client
(Enter your own values)
```bash
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

VITE_API=

VITE_RAZORPAY_KEY_ID=

```
Server
(Enter your own values)
```bash
MONGO_URI=
PORT=
JWT_SECRET=""

FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=""

EMAIL_USER=
EMAIL_PASS=
CLIENT_URL=

RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```
   
## Repository Structure

```text
flameon/
├─ client/                # React (Vite)
│  ├─ public/
│  ├─ src/                # components, pages, services, store, utils
│  └─ package.json
├─ server/                # Node/Express API
│  ├─ src/                # middleware, models, routes, utils, uploads
│  └─ package.json
└─ README.md
```

## Tailwind Integration

```bash
cd client
npm i -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## Testing Credentials - User and Admin

User
Register with real email to recieve updates (Recommended)

Admin
```text
Email - krc2win@gmail.com
Pass - Qwerty@1234
```

### Testing Credentials - RazorPay

1) Card
```text
4386 2894 0766 0153 | Random CVV |	Any future date
```
2) UPI
   
success 
```text
success@razorpay
```
failure 
```text
failure@razorpay
```

[For further Clarification↗](https://razorpay.com/docs/payments/payments/test-card-details/)

## Live Links

[Client↗](https://flame-on.vercel.app/)
[Server↗](https://flameon.onrender.com/)




