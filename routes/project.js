import express from 'express';

import * as ProjectController from '../controllers/question';

const router = express.Router();

router.post('/projects', ProjectController.createProject);
router.get('/projects', ProjectController.getAllProjects);
router.get('/projects/:login', ProjectController.getProjectByUserLogin);

router.get('/projects/:url', ProjectController.getProject);
router.put('/projects/:id', ProjectController.updateProject);
router.delete('/projects/:id', ProjectController.deleteProject);


export default router;
