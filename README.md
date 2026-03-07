# 🍽️ Restaurant Ordering App

A modern **Restaurant Web Application** built with **Next.js, React.js, and Firebase**. The app allows customers to browse restaurant menus, view food items, and place orders with a fast and responsive interface.

It uses **Firebase as a backend service** for authentication, database, and storage, making it scalable and easy to maintain.

---

## 🚀 Features

### Customer Features
- Browse restaurant menu
- View food categories
- Food item details with price and description
- Add items to cart
- Place orders
- Fully responsive design

### Admin Features
- Manage menu items
- Add / edit / delete food items
- Manage food categories
- Manage restaurant orders

### Technical Features
- Server-side rendering with Next.js
- Real-time database using Firebase Firestore
- Firebase Authentication
- Image upload using Firebase Storage
- SEO-friendly pages
- Modern UI with reusable components

---

## 🛠 Tech Stack

Frontend
- Next.js
- React.js
- Tailwind CSS

Backend / Cloud
- Firebase
- Firestore Database
- Firebase Authentication
- Firebase Storage

Other Tools
- ESLint
- Git
- Vercel (Deployment)

---

## 📁 Project Structure

restaurant-app  
├── app/                # Next.js app router pages  
├── components/         # Reusable UI components  
├── lib/                # Firebase configuration  
├── hooks/              # Custom React hooks  
├── services/           # Business logic and APIs  
├── public/             # Static assets  
├── styles/             # Global styles  
└── firebase/           # Firebase setup  

---

## ⚙️ Installation

### Clone the repository

git clone https://github.com/yourusername/restaurant-app.git  

cd restaurant-app

---

### Install dependencies

npm install  

or  

yarn install

---

### Setup environment variables

Create a `.env.local` file in the root directory.

NEXT_PUBLIC_FIREBASE_API_KEY=  
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=  
NEXT_PUBLIC_FIREBASE_PROJECT_ID=  
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=  
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=  
NEXT_PUBLIC_FIREBASE_APP_ID=  

You can obtain these credentials from the **Firebase Console**.

---

## ▶️ Run the Project

Start development server:

npm run dev

Build for production:

npm run build  
npm start

Open in browser:

http://localhost:3000

---

## 🔐 Firebase Setup

1. Go to Firebase Console  
2. Create a new project  
3. Enable the following services:
   - Authentication
   - Firestore Database
   - Firebase Storage
4. Add a Web App  
5. Copy the Firebase configuration into `.env.local`

---

## 🌍 Deployment

You can deploy this project on:

- Vercel
- Firebase Hosting
- AWS
- DigitalOcean

Example using Vercel:

npm install -g vercel  
vercel

---

## 📈 Future Improvements

- Online payment integration  
- Real-time order tracking  
- Push notifications  
- Multi-restaurant support  
- Mobile application (React Native)

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Codiexy Solutions  
Web & Mobile Development Company
