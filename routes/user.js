import express from 'express';

import * as UserController from '../controllers/user';


const router = express.Router();

router.get('/current-user', UserController.getCurrentUser);
router.put('/users/:id', UserController.updateUser);

export default router;