import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js"
import postRoute from "./routes/post.route.js"
import messageRoute from "./routes/message.route.js"
import storyRoute from "./routes/story.route.js"
import { app, server } from "./socket/socket.js";

dotenv.config({});


const PORT = process.env.PORT?.trim() || 3000;

app.get("/" , (_ ,res) => {
    return res.status(200).json({
        message : "Hello there ! Everything is fine",
        success : true,
    })
})
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({extended: true}))
const corsOptions = {
    origin : ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials : true
};
app.use(cors(corsOptions));

app.use("/api/v1/user"  , userRoute);
app.use("/api/v1/post"  , postRoute);
app.use("/api/v1/message"  , messageRoute);
app.use("/api/v1/story", storyRoute);
server.listen(PORT , () => {   
    connectDB();
    console.log(`Server started at PORT ${PORT}`);
});
