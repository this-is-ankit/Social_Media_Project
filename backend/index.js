import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import messageRoute from "./routes/message.route.js";
import storyRoute from "./routes/story.route.js";
import { app, server } from "./socket/socket.js";
import path from "path"; // <-- 1. Added path import

dotenv.config({});

const PORT = process.env.PORT?.trim() || 3000;
const __dirname = path.resolve(); // <-- 2. Defined __dirname for ES Modules

// We can remove your test app.get("/") route because your React app will now serve the home page!

app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

const corsOptions = {
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // Fine to keep for local development
    credentials: true
};
app.use(cors(corsOptions));

// --- API ROUTES ---
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/message", messageRoute);
app.use("/api/v1/story", storyRoute);

// --- DEPLOYMENT CONFIGURATION ---
// 3. Serve the static Vite build files from the frontend directory
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// 4. Catch-all route (FIXED for Express 5)
app.get(["/", "/*path"], (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// --- START SERVER ---
server.listen(PORT, () => {   
    connectDB();
    console.log(`Server started at PORT ${PORT}`);
});