import User from '../models/user.model.js';

export const authCallback = async (req, res) => {
  try{
    const{id, firstName, lastName, imageUrl} = req.body;

    //check if the user exists in the database
    const user = await User.findOne({clerkId: id});

    if(!user){
      //signup the user
      await User.create({
        clerkId: id,
        fullName: `${firstName} ${lastName}`,
        imageUrl
      });
    }

    res.status(200).send('User signed up successfully');
  } catch (error) {
    console.error('Error occurred during user signup:', error);
    res.status(500).send('Error occurred');
  }
}