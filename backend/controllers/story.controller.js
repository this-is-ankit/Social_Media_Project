import { Story } from "../models/story.model.js";
import { User } from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";
import sharp from "sharp";

export const addStory = async (req, res) => {
    try {
        const image = req.file;
        const userId = req.id;

        if (!image) {
            return res.status(400).json({ message: "Image is required", success: false });
        }

        const optimizedImageBuffer = await sharp(image.buffer)
            .resize({ width: 1080, height: 1920, fit: 'inside' })
            .toFormat('jpeg', { quality: 80 })
            .toBuffer();

        const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`;
        const cloudResponse = await cloudinary.uploader.upload(fileUri);

        const story = await Story.create({
            user: userId,
            image: cloudResponse.secure_url
        });

        await story.populate({ path: 'user', select: 'username profilePicture' });

        return res.status(201).json({
            message: "Story added successfully",
            story,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const getStories = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        const following = user.following;
        const userIds = [...following, userId];

        const stories = await Story.find({ user: { $in: userIds } })
            .sort({ createdAt: -1 })
            .populate({ path: 'user', select: 'username profilePicture' });

        return res.status(200).json({
            stories,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};
