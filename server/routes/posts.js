import express from 'express';
import {getFeedPosts, getUserPosts, likePost} from '../controllers/posts.js';
import {verifyToken} from "../middleware/auth.js";



const router = express.Router();


// Read

// give all post present in the data
router.get('/', verifyToken, getFeedPosts);
router.get('/:userId/posts', verifyToken, getUserPosts); // this is to only grab posts from the particualer user



// UPDATE
router.patch('/:id/like', verifyToken, likePost); // thsi is to like and unlike the post

export default router;