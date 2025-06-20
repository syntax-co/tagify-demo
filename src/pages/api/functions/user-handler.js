import User from '../schemas/user.js'
import connectDB from './connect-db.js'




const addUser = async(data) => {

    const {authId,username,role} = data

    
    try {
        await connectDB();

        const check = await User.findOne({username})
        
        
        if (check) {
            return {success:false, message:'Username already taken'}
        } else {
            
            const user = new User({
                authId,
                username,
                role
            })
            

            await user.save()
            
            return {success:true}
        }
    } catch (err) {
        return(err)
    }
}




const getUser = async(data) => {

    const {username} = data;

    try {
        await connectDB();

        const user = await User.findOne({username})
        
        if (user) {
            return {success:true, user}
        } else {
            return {success:false, message:'User not found'}
        }
    } catch (err) {
        return(err)
    }

}






module.exports = {
    addUser,
    getUser
}