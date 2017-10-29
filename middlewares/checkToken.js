import jwt from 'jsonwebtoken';
import config from '../config/index';

export default async (req, res, next) => {
	const token = req.headers['sp-token'];
	if(!token){
		return next({
			status: 403,
			message: 'Forbidden. Not token!'
		});
	}
	try{
		var tokenObj = jwt.verify(token, config.secret);
	}catch (message){
		return next({
			status: 400,
			message: 'Invalid token!'
		});
	}
	req.token = tokenObj;
	next();
}