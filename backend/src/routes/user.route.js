import { Router } from 'express';
import { protectRoute } from './../middleware/auth.middleware';
import { getAllUsers } from './../controller/user.controller';

const router = Router();

router.get('/', protectRoute, getAllUsers);

//todo:get messages from a user

export default router;