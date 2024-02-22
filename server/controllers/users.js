import User from "../models/User.js"

// READ

export const getUser = async (req, res) =>{
    try{
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user); // passing all the 
        // user information to the front end 
    }catch(err){
         res.status(404).json({message: err.message}); 
    }
}

export const getUserFriends = async(req,res)=>{

    try{
        const {id} = req.params;
        const user = await User.findById(id);
    
        //getting all friends from the list
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        // formatted  friends array so that we get only
        // selected information about the friends before
        // sending it to the frontend
        const formattedFriends = friends.map(({_id, firstName, lastName, occupation, location, picturePath}) => {
            return {_id, firstName, lastName, occupation, location, picturePath};
        })
    }catch(error){
        res.status(404).json({message: error.message});
         
    }
    
}


// UPDATE
export const addRemoveFriend = async(req, res) => {
    try{
        const {id, friendId } = req.params;
        console.log(id);
        console.log(friendId)
        const user = await User.findById(id);
        const friend = await User.findById(friendId);
        // console.log(user)
        // console.log(friend)
        // removing friend if it is present in the friend ID
        if(user.friends.includes(friendId)){
            user.friends = user.friends.filter((id) => id !== friendId);
            //also removing the user from the friends list of friendId
            friend.friends = friend.friends.filter((id) => id !== id); 
        }else{
            user.friends.push(friendId);
            friend.friends.push(id);
        }

        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        ); // geting the friends array
        const formattedFriends = friends.map(
            ({_id, firstName, lastName, occupation, location, picturePath}) => {
                return {_id, firstName, lastName, occupation, location, picturePath};
            }
        );
        
        // returning the updated frineds list
        res.status(200).json(formattedFriends);

    }catch(error){
        res.status(404).json({message: error.message});       
    }
}