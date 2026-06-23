import User from '../models/user.model.js';

export const getAllUsers = async (req, res, next) => {
    try{
        const currentUser = await User.findById(req.user._id);
        const users = await User.find({clerkId: {$ne: currentUser.clerkId}});
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}