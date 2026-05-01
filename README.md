<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12&height=200&section=header&text=Flik&fontSize=80&fontAlignY=35&desc=Full%20Stack%20Social%20Media%20Platform&descAlignY=55&descSize=20&animation=fadeIn" width="100%"/>

<br/>

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)
![Redux](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

<br/>

> A robust, feature-rich social media platform built with the MERN stack — featuring real-time messaging, short-form video, stories, and more.

<br/>

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Click_Here-black?style=for-the-badge)](https://github.com/yourusername/flik)
[![GitHub Stars](https://img.shields.io/github/stars/yourusername/flik?style=for-the-badge&color=yellow)](https://github.com/yourusername/flik/stargazers)
[![GitHub Issues](https://img.shields.io/github/issues/yourusername/flik?style=for-the-badge)](https://github.com/yourusername/flik/issues)

</div>

---

## 📸 Preview

<div align="center">
  <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWN0M3NvbXhiazc5d3pieWMwdHQzY3lkMTVybDhpcThiYjlxcmZkNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9SJaONs482vvfqp3z9/giphy.gif" width="80%" alt="Flik Demo"/>
</div>

---

## 🌐 Overview

**Flik** is a complete social media ecosystem designed to handle complex user interactions at scale. Think short-form video discovery, real-time chat, expiring stories, smart notifications — all in one cohesive, mobile-first experience.

Every layer — from MongoDB schema design to a fully responsive React UI — has been built with performance and scalability in mind.

<br/>

```
📦 Flik
 ┣ 🎨 Frontend    →   React + Vite + Tailwind + shadcn/ui
 ┣ ⚙️  Backend     →   Node.js + Express + MongoDB + Socket.io
 ┗ ☁️  Cloud       →   Cloudinary (media) + JWT (auth)
```

---

## ✨ Features

### 📸 Media & Content Discovery

| Feature | Description |
|---|---|
| 🎬 **Scrolls (Video Feed)** | Vertical short-form video feed with auto-play via Intersection Observer and scroll-snapping |
| 📷 **Photo & Video Posts** | Upload media with captions, powered by Cloudinary for optimized delivery |
| ⚡ **24-Hour Stories** | Temporary image stories that auto-expire using MongoDB TTL indexes |
| 🏠 **Dynamic Home Feed** | Personalized feed showing posts from followed users |
| ❤️ **Engagement** | Likes, threaded comments, and a private Bookmarks/Saved collection |
| 🔍 **User Discovery** | Dedicated search page to find and connect with other users |

<br/>

### 💬 Real-Time Communication

| Feature | Description |
|---|---|
| ⚡ **Instant Messaging** | One-on-one chat via Socket.io with zero-latency delivery |
| 🔔 **Live Notifications** | Real-time push updates for likes, comments, and follows — with notification badges |
| 🟢 **Online Status** | Live online/offline presence indicators |

<br/>

### 👤 Profiles & Social Graph

| Feature | Description |
|---|---|
| 🧑‍💻 **Profile Customization** | Update bio, profile picture, and gender via shadcn/ui dialogs |
| 🔗 **Follow / Unfollow** | Build your network with optimistic UI updates for instant feedback |
| 💡 **Suggested Users** | Smart sidebar recommendations for new connections |

<br/>

### 🔐 Architecture & UX

| Feature | Description |
|---|---|
| 📱 **Responsive Design** | Mobile-first layout with a collapsible sliding hamburger menu (Sheet component) |
| 🔒 **JWT Authentication** | Secure Sign Up & Login using JSON Web Tokens stored in HTTP-only cookies |
| 🌗 **Dark / Light Mode** | Seamless theme switching with high-contrast UI elements |

---

## 🛠️ Tech Stack

<details>
<summary><b>🎨 Frontend</b></summary>

<br/>

| Technology | Purpose |
|---|---|
| **React.js + Vite** | Fast, component-based UI with HMR |
| **Redux Toolkit** | Global state management (Users, Posts, Chat, Notifications) |
| **Tailwind CSS** | Utility-first styling and responsive breakpoints |
| **shadcn/ui** | Accessible, customizable UI components (Dialogs, Sheets, Avatars) |

</details>

<details>
<summary><b>⚙️ Backend</b></summary>

<br/>

| Technology | Purpose |
|---|---|
| **Node.js + Express.js** | Scalable REST API server |
| **MongoDB + Mongoose** | Flexible, schema-based data modeling |
| **Socket.io** | Bidirectional real-time events |
| **Cloudinary + Multer** | File uploading and media management |
| **JWT** | Stateless authentication via HTTP-only cookies |

</details>

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/) (local or Atlas URI)
- A [Cloudinary](https://cloudinary.com/) account

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/flik.git
cd flik
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` directory:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:5173
```

Start the backend server:

```bash
npm run dev
```

### 3. Frontend Setup

Open a new terminal window:

```bash
cd frontend
npm install
npm run dev
```

### 4. Access the App

Open your browser and navigate to:

```
http://localhost:5173
```

---

## 📁 Project Structure

```
flik/
├── backend/
│   ├── controllers/       # Route logic
│   ├── models/            # Mongoose schemas
│   ├── routes/            # Express routes
│   ├── middlewares/       # Auth, error handling
│   ├── socket/            # Socket.io setup
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/    # Reusable UI components
    │   ├── pages/         # Route-level pages
    │   ├── redux/         # Store, slices
    │   ├── hooks/         # Custom hooks
    │   └── App.jsx
    └── vite.config.js
```

---

## 🗺️ Roadmap

- [ ] 🔍 Explore / Trending page
- [ ] 📊 Post analytics for creators
- [ ] 🎙️ Voice messages in chat
- [ ] 📲 PWA support for mobile installation
- [ ] 🤖 AI-powered content recommendations

---

## 👨‍💻 Author

<div align="center">

**Ankit Kumar**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/this-is-ankit)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](linkedin.com/in/ankit-kumar-9036a0346)

*Built with ☕, late nights, and a love for clean architecture.*

</div>

---

<div align="center">

If you found this project useful, consider giving it a ⭐ — it genuinely helps!

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12&height=100&section=footer" width="100%"/>

</div>