import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../models/User.js";


// REGISTER USER LOGIC

export const register = async(req, res) => {
    try{
        const{
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body; // getting this from frontend

        const salt = await bcrypt.genSalt(); // creating salt
        // using this salt to encrypt the password
        const passwordHash = await bcrypt.hash(password, salt);
          
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        });
        const savedUser = await newUser.save();
        //below line will send the respose with the 
        //user information
        res.status(201).json(savedUser);
    }catch(error){
        res.status(500).json({error: err.message});
    }
} 

// LOGGING IN 
// export const login = async(req,res) => {
//     try{
//         const {email, password} = req.body;
//         const user  = await User.findOne({email: email});
//         if(!user){
//             return res.status(400).json({msg: "user Does not exist"});

//         }

//         // to compare both the password return truee or false
//         const isMatch = await bcrypt.compare(password, user.password);

//         if(!isMatch){
//             return res.status(400).json({msg: "invalid credentails"});
//         }

//         const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
//         delete user.password;
//         res.status(200).json({token, user});


//     }catch(err){
//         res.status(500).json({error: err.message})
//     }
// }
export const login = async (req, res) => {
    try {

        const { email, password } = req.body;
        // const email = "mahesh@gmail.com"
        // const password = "mahesh123"

        console.log(email)
        console.log(password)
        
        const user = await User.findOne({ email: email });

        // Check if user exists
        if (!user) {
            return res.status(400).json({ msg: "User does not exist" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // If passwords match, generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        // Remove sensitive information from the user object before sending it in the response
        const userWithoutPassword = { ...user.toObject(), password: undefined };

        res.status(200).json({ token, user: userWithoutPassword });
    } catch (err) {
        console.error("Error in login:", err);
        res.status(500).json({ error: err.message });
    }
};