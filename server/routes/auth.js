import express from 'express'
import {login} from "../controllers/auth.js"

// this allow us to the use routes
// from different files to keep the endpoints
// well organized
const router = express.Router();
router.post('/login', login);
export default router; 