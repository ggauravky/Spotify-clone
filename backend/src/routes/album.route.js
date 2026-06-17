import { Router } from 'express';
import { getAlbums, getAllAlbums } from '../controllers/album.controller.js';

const router = Router();

router.get('/', getAlbums);
router.get('/:albumId', getAllAlbums);

export default router;