import sharp from "sharp";
import cloudinary from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";
import { Post } from "../models/post.model.js";
import { Comment } from "../models/comment.model.js";

export const addNewPost = async (req, res) => {
    try {
        const { caption } = req.body;
        const image = req.file;
        const authorId = req.id;
        if (!image) return res.status(400).json({ message: "Image required" });

        const optimizedImageBuffer = await sharp(image.buffer)
            .resize({ width: 800, height: 800, fit: 'inside' })
            .toFormat('jpeg', { quality: 80 })
            .toBuffer();

        const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`;
        const cloudResponse = await cloudinary.uploader.upload(fileUri);
        const post = await Post.create({
            caption,
            image: cloudResponse.secure_url,
            author: authorId
        });
        const user = await User.findById(authorId);
        if (user) {
            user.posts.push(post._id);
            await user.save();
        }
        await post.populate({ path: 'author', select: "-password" });
        return res.status(201).json({
            message: "New post added",
            post,
            success: true
        })
    } catch (error) {
        console.error(error);
    }
};

export const getAllPost = async (req, res) => {
    try {
        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .populate({ path: 'author', select: 'username  profilePicture' })
            .populate({
                path: 'comments',
                sort: { createdAt: -1 },
                populate: {
                    path: 'author',
                    select: 'username  profilePicture'
                }
            });
        return res.status(200).json({ posts, success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', success: false });
    }
};
export const getUserPost = async (req, res) => {
    try {
        const authorId = req.id;
        const posts = await Post.find({ author: authorId }).sort({ createdAt: -1 }).populate({
            path: 'author',
            select: 'username , profilePicture'
        }).populate({
            path: 'comments',
            sort: { createdAt: -1 },
            populate: {
                path: 'author',
                select: 'username , profilePicture'
            }
        });
        return res.status(200).json({
            posts,
            success: true,
        })
    } catch (error) {
        console.log(error)
    }
}
export const likePost = async (req, res) => {
    try {
        const likeKrneWalaUserKiId = req.id;
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({
            message: "Post not found",
            success: false
        });
        await post.updateOne({ $addToSet: { likes: likeKrneWalaUserKiId } });
        await post.save();
        return res.status(200).json({
            message: "Post liked",
            success: true,
        })
    } catch (error) {
        console.log(error);
    }
}
export const dislikePost = async (req, res) => {
    try {
        const likeKrneWalaUserKiId = req.id;
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({
            message: "Post not found",
            success: false
        });
        await post.updateOne({ $pull: { likes: likeKrneWalaUserKiId } });
        await post.save();
        return res.status(200).json({
            message: "Post disliked",
            success: true,
        })
    } catch (error) {
        console.log(error);
    }
}
export const addComment = async (req, res) => {
    try {
        const postId = req.params.id;
        const commenting_user = req.id;
        const { text } = req.body;
        const post = await Post.findById(postId);
        if (!text) return res.status(404).json({
            message: "Text is required to add a comment",
            success: false
        });
        const comment = await Comment.create({
            text,
            author: commenting_user,
            post: postId,
        })
        await comment.populate({
            path: 'author',
            select: 'username profilePicture'
        })
        post.comments.push(comment._id);
        await post.save();

        return res.status(200).json({
            message: "Comment added",
            comment,
            success: true,
        })
    } catch (error) {
        console.log(error);
    }
}
export const getCommentOfPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const comments = await Comment.find({ post: postId }).populate('author', 'username  profilePicture');
        if (!comments) res.status(200).json({
            message: "No comments found for this post",
            success: false,
        })
        return res.status(200).json({
            success: true,
            comments
        })
    } catch (error) {
        console.log(error);
    }
}
export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const authorId = req.id;
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({
            message: "Post not found",
            sucess: false
        });
        if (post.author.toString() !== authorId) return res.status(404).json({
            message: "You are not authorised to delete this post",
            sucess: false
        })
        await Post.findByIdAndDelete(postId);

        let user = await User.findById(authorId);
        user.posts = user.posts.filter(id => id.toString() !== postId);
        await user.save();
        if (!user) return res.status(200).json({
            message: "user not found",
            sucess: false,
        })

        await Comment.deleteMany({ post: postId });
        return res.status(400).json({
            message: "Deleted succesfully",
            success: true,
        })
    } catch (error) {
        console.log(error);
    }
}
export const bookMarkPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const authorId = req.id;
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({
            message: "Post not found",
            success: false,
        })

        const user = await User.findById(authorId);
        if (user.bookmarks.includes(post._id)) {
            await user.updateOne({ $pull: { bookmarks: post._id } })
            await user.save();
            return res.status(200).json({
                type: 'unsaved',
                message: "Post removed from bookmark",
                success: true
            });

        }
        else {
            await user.updateOne({ $addToSet: { bookmarks: post._id } })
            await user.save();
            return res.status(200).json({
                type: 'saved',
                message: "Post added to bookmark",
                success: true
            });
        }
    } catch (error) {
        console.log(error);
    }
}

export const getExplorePosts = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId);
        const following = user.following;

        const posts = await Post.find({
            author: { $nin: [...following, userId] }
        })
        .sort({ createdAt: -1 })
        .populate({ path: 'author', select: 'username profilePicture' })
        .populate({
            path: 'comments',
            sort: { createdAt: -1 },
            populate: {
                path: 'author',
                select: 'username profilePicture'
            }
        });

        return res.status(200).json({
            posts,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};
