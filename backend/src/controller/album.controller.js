import { Album } from './../models/album.model';


export const getAlbums = async (req, res,next) => {
    try{
        const Albums = await Album.findAll();
        res.status(200).json(Albums);
    } catch (error) {
        next(error);
    }
    
};

export const getAllAlbums = async (req, res,next) => {
    try{
        const {albumId} = req.params;
        const album = await Album.findByPk(albumId).populate('songs');
        if (!album) {
            return res.status(404).json({ message: 'Album not found' });
        }
        res.status(200).json(album);

    } catch (error) {
        next(error);
    }
}