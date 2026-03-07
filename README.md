# 🍽️ Hot Dog Kings – Restaurant Ordering App

Hot Dog Kings is a modern restaurant web application built using Next.js, React.js, and Firebase. The application allows customers to browse the restaurant menu, explore food items, and place orders through a fast and responsive interface.

The platform uses Firebase services for authentication, database, and hosting, making the application scalable, secure, and easy to maintain.

---

## 🌐 Live Application

Landing Page  
https://hot-dog-kings.web.app/

Main App (Menu)  
https://hot-dog-kings.web.app/hot-dog-kings/menu

---

## 🚀 Features

Customer Features
- Browse restaurant menu
- View food categories
- Detailed food item information
- Add items to cart
- Place orders
- Mobile-friendly responsive design

Admin Features
- Manage menu items
- Add, update, and delete food items
- Manage food categories
- Order management system

Technical Features
- Server-side rendering with Next.js
- Real-time database using Firebase Firestore
- Firebase Authentication
- Firebase Storage for images
- SEO-friendly landing pages
- Fast and modern UI

---

## 🛠 Tech Stack

Frontend
- Next.js
- React.js
- Tailwind CSS

Backend / Cloud
- Firebase
- Firebase Firestore
- Firebase Authentication
- Firebase Hosting
- Firebase Storage

Tools
- ESLint
- Git
- Firebase CLI

---

## 📁 Project Structure

hot-dog-kings  
├── app/                # Next.js app router pages  
├── components/         # Reusable UI components  
├── lib/                # Firebase configuration  
├── hooks/              # Custom React hooks  
├── services/           # Business logic  
├── public/             # Static assets  
├── styles/             # Global styles  
└── firebase/           # Firebase configuration  

---

## ⚙️ Installation

Clone the repository

git clone https://github.com/yourusername/hot-dog-kings.git

cd hot-dog-kings

Install dependencies

npm install

or

yarn install

---

## 🔑 Setup Environment Variables

Create a `.env.local` file in the root directory and add your Firebase credentials.

NEXT_PUBLIC_FIREBASE_API_KEY=  
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=  
NEXT_PUBLIC_FIREBASE_PROJECT_ID=  
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=  
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=  
NEXT_PUBLIC_FIREBASE_APP_ID=  

You can obtain these credentials from the Firebase Console.

---

## ▶️ Run the Project

Start development server

npm run dev

Build for production

npm run build  
npm start

Open in browser

http://localhost:3000

---

## 🔐 Firebase Setup

1. Go to Firebase Console  
2. Create a new project  
3. Enable the following services  
   - Authentication  
   - Firestore Database  
   - Firebase Storage  
   - Firebase Hosting  
4. Add a Web App  
5. Copy the Firebase configuration into `.env.local`

---

## 🌍 Deployment

The project is deployed using Firebase Hosting.

Deploy using

firebase deploy

Live URL

https://hot-dog-kings.web.app/

---

## 📈 Future Improvements

- Online payment integration  
- Real-time order tracking  
- Push notifications  
- Multi-restaurant support  
- Mobile application using React Native  

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Codiexy Solutions  
Web & Mobile Development Company
