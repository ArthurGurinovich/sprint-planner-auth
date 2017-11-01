import express from 'express';

import * as StoryController from '../controllers/story';

const router = express.Router();

router.post('/stories', StoryController.createStory);
router.get('/stories', StoryController.getAllStories);
router.get('/stories/:login', StoryController.getStoryByUserLogin);

router.get('/stories/:url', StoryController.getStory);
router.put('/stories/:id', StoryController.updateStory);
router.delete('/stories/:id', StoryController.deleteStory);


export default router;
