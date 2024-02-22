import mongoose from 'mongoose'

const postSchema = mongoose.Schema(
    {
        userId:{
            type:String,
            required: true,
        },
        firstName: {
            type:String,
            required: true,
        },
        lastName:{
            type:String,
            required: true,
        },
        location:String,
        description: String,
        picturePath: String,
        userPicturePath: String,
        likes: {
            type: Map, // using Map because it is more
            // proficient and faster than array
            of: Boolean
        },
        // if you like the post hte user id gets added to map
        // and if you dont it wwill not be present in the map
        comments : {
            type: Array,
            default: []
        }, 
    },
    {
        timestamps: true
    }
)

const Post = mongoose.model("Post", postSchema);

export default Post;