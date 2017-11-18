import express from 'express';

import * as StoryController from '../controllers/story';

const router = express.Router();

router.post('/stories', StoryController.createStory);
router.get('/stories/:id', StoryController.getStory);
router.put('/stories/:id', StoryController.updateStory);
router.delete('/stories/:id', StoryController.deleteStory);
router.get('/stories', StoryController.getAllStories);
router.get('/stories/:login', StoryController.getStoryByUserLogin);




export default router;
