import Song from '../models/Song.model.js';
import Album from '../models/Album.model.js';
import cloudinary from 'cloudinary';

const uploadToCloudinary = async (file) => {
  // Implement your logic to upload the file to Cloudinary and return the URL
  // You can use the Cloudinary SDK for this purpose
  try{
    const result=await cloudinary.uploader.upload(file.path, {
      resource_type: 'auto', // Automatically detect the file type (image, video, etc.)
    });
    return result.secure_url; // Return the secure URL of the uploaded file
  }catch(error){
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Failed to upload file');
  }
};

export const createSong=async(req, res, next) => {
  try{
    if(!req.files || !req.files.audioFile || !req.files.imageFile){
      return res.status(400).json({message: 'Audio and image files are required'});
    }

    const {title, artist, albumId,duration} = req.body;
    const audioUrl = req.files.audioFile.path;
    const imageUrl = req.files.imageFile.path;

    const audioUrl=await uploadToCloudinary(audioFile);
    const imageUrl=await uploadToCloudinary(imageFile);

    const song=new Song({
      title,
      artist,
      albumId: albumId || null,
      duration,
      audioUrl,
      imageUrl
    });

    await song.save();
    if(albumId){
      await Album.findByIdAndUpdate(albumId,{
        $push: {songs: song._id},
      }); // Add song to album's songs array
    }
    return res.status(201).json({message: 'Song created successfully', song});
  } catch (error) {
    console.error('Error creating song:', error);
    next(error);
  }
};

export const deleteSong=async(req, res, next) => {
  try{
    const {id} = req.params;

    const song=await Song.findById(id);

    if(song.albumId){
      await Album.findByIdAndUpdate(song.albumId,{
        $pull: {songs: song._id},
      }); // Remove song from album's songs array
    }
    await Song.findByIdAndDelete(id);

    return res.status(200).json({message: 'Song deleted successfully'});
  } catch (error) {
    console.error('Error deleting song:', error);
    next(error);
  }
};

export const createAlbum=async(req, res, next) => {
  try{
    const {title, artist ,releaseYear} = req.body;

    const {imageFile} = req.files ;

    const imageUrl=await uploadToCloudinary(imageFile);

    const album=new Album({
      title,
      artist,
      releaseYear,
      imageUrl
    });

    await album.save();

    res.status(201).json({message: 'Album created successfully', album});
  } catch (error) {
    console.error('Error creating album:', error);
    next(error);
  }
};


export const deleteAlbum=async(req, res, next) => {
  try{
    const {id} = req.params;

    await Song.deleteMany({albumId: id}); // Delete all songs associated with the album
    await Album.findByIdAndDelete(id);
    res.status(200).json({message: 'Album and associated songs deleted successfully'});
  }catch (error) {
    console.error('Error deleting album:', error);
    next(error);
  }
};

export const checkAdmin=async(req, res, next) => {
  res.status(200).json({admin:True});
}