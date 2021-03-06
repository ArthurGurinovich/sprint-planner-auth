import Story from '../models/story';
import User from '../models/user';

export async function createStory(req, res, next){
	const storyData = req.body;
	const userId = req.token._id;
	storyData.userId = userId;

	try{
		var story = await Story.create(storyData);
	}catch({ message }){
		return next({
			status: 400,
			message
		});
	}
	res.json(story);
}

export async function updateStory(req, res, next){
	const storyData = req.body;
	const _id= req.params.id;
	try{
		var story = await Story.findOne({ _id });
	}catch({ message }){
		return next({
			status: 500,
			message
		});
	}

	if(!story){
		return next({
			status: 404,
			message: 'Story not found!'
		});
	}

	try{
		story.updateOne(storyData);
	}catch({ message }){
		return next({
			status: 500,
			message
		});
	}

	res.json(story);
}	

export async function getAllStories(req, res, next){
	try{
		var stories = await Story.find({});
	}catch({ message }){
		return next({
			status: 500,
			message
		});
	}
	res.json({stories});
}

export async function getStory(req, res, next){
	const _id = req.params.id;
	try{
		var story = await Story.findOne({ _id });
	}catch({ message }){
		return next({
			status: 500,
			message
		});
	}
	res.json(story);
}

export async function getStoryByUserLogin(req, res, next){
	const login = req.params.login; 

	try{
		var user = await User.findOne({ login });
	}catch({ message }){
		return next({
			status: 508,
			message: 'Something went wrong on server side!'
		});
	}

	if(!user){
		return next({
			status: 404,
			message: 'User not found!'
		});
	}
	try{
		var stories = await Story.find({ userId: user._id });
	}catch({ message }){
		return next({
			status: 500,
			message
		});
	}

	res.json( stories );
}

export async function deleteStory(req, res, next){
	const _id = req.params.id;
	try{
		var story = await Story.findOne({ _id });
	}catch({ message }){
		return next({
			status: 500,
			message
		});
	}

	if(!story){
		return next({
			status: 404,
			message: 'Story not found!'
		});
	}

	try{
		story.remove();
	}catch({ message }){
		return next({
			status: 500,
			message
		});
	}

	return res.json({message: 'Story was deleted'});
}












