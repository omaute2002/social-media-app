import express from "express";

import{
    getUser,
    getUserFriends,
    addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// READ REQEUSTS
// this route gonna be users/:id, because we have already created 
// the user route in index js file to get users information
// this is the further part of the url request that we will beusing
// to get the information of the users
// verifyToken middleware is to verify the user is logging in authorized
// to get the access of the information 
router.get('/:id', verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

// UPDATE REQUEST
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);
 

export default router;
