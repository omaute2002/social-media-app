import jwt from 'jsonwebtoken';

export const verifyToken = async(req, res, next) => {
    try{
        // requesting authorization header from 
        // the frontend to get the token that is set
        let token = req.header("Authorization");

        if(!token){
            return res.status(403).send("Access Denied");
        }
        if(token.startsWith("Bearer ")){
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;

        // next to run the next funciton after this middleware
        
        next();

    }catch(error){
        res.status(500).json({error: err.message})
    }
}