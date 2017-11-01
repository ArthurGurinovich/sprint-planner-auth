import Project from '../models/project';
import User from '../models/user';

export async function createProject(req, res, next){
	const projectData = req.body;
	const userId = req.token._id;
	projectData.userId = userId;

	try{
		var project = await Project.create(projectData);
	}catch({ message }){
		return next({
			status: 400,
			message
		});
	}
	res.json(project);
}

export async function updateProject(req, res, next){
	const projectData = req.body;
	const { url }= req.params.url;
	const userId  = req.user._id 
	try{
		var project = await Project.findOne({ url });
	}catch({ message }){
		return next({
			status: 500,
			message
		});
	}

	if(!project){
		return next({
			status: 404,
			message: 'Project not found!'
		});
	}

	if(userId.toString() !== project.userId.toString()){
		return next({
			status: 403,
			message: 'Permission Denied'
		});
	}

	try{
		project.updateOne(projectData);
	}catch({ message }){
		return next({
			status: 500,
			message
		});
	}

	res.json(project);
}	

export async function getAllProject(req, res, next){
	try{
		var projects = await Project.find({});
	}catch({ message }){
		return next({
			status: 500,
			message
		});
	}
	res.json({projects});
}

export async function getProject(req, res, next){
	const url = req.params.url;
	try{
		var project = await Project.findOne({ url });
	}catch({ message }){
		return next({
			status: 500,
			message
		});
	}
	res.json(project);
}

export async function getProjectByUserLogin(req, res, next){
	const login = req.params.login; 

	try{
		var user = await User.findOne({ login });
	}catch({ message }){
		return next({
			status: 500,
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
		var projects = await Project.find({ userId: user._id });
	}catch({ message }){
		return next({
			status: 500,
			message
		});
	}

	res.json({ projects });
}

export async function deleteProject(req, res, next){
	const _id = req.params.id;
	const userId  = req.user._id 
	try{
		var project = await Project.findOne({ _id });
	}catch({ message }){
		return next({
			status: 500,
			message
		});
	}

	if(!project){
		return next({
			status: 404,
			message: 'Project not found!'
		});
	}

	if(userId.toString() !== project.userId.toString()){
		return next({
			status: 403,
			message: 'Permission Denied'
		});
	}
	try{
		project.remove();
	}catch({ message }){
		return next({
			status: 500,
			message
		});
	}

	return res.json({message: 'Project was deleted'});
}












