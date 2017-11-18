import express from 'express';

import * as ProjectController from '../controllers/project';

const router = express.Router();

router.post('/projects', ProjectController.createProject);
router.get('/projects/:id', ProjectController.getProject);
router.put('/projects/:id', ProjectController.updateProject);
router.delete('/projects/:id', ProjectController.deleteProject);
router.get('/projects', ProjectController.getAllProject);
router.get('/projects/:login', ProjectController.getProjectByUserLogin);




export default router;
