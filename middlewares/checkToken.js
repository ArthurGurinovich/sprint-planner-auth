import jwt from 'jsonwebtoken';
import config from '../config/index';

export default async (req, res, next) => {
	const token = req.headers['sp-token'];
	console.log(req.headers);
	if(!token){
		return res
			.status(403)
			.json({ message: 'Forbidden. Not token!' });
	}
	try{
		var tokenObj = jwt.verify(token, config.secret);
	}catch (message){
		return res
			.status(400)
			.json({ message: 'Invalid token!' });
	}
	next();
}