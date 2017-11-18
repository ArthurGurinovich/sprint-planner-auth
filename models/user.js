import mongoose, { Schema } from 'mongoose';
import bcrypt  from 'bcrypt-as-promised';

const UserSchema  = new Schema({
	login: { type: String, unique: true, lowercase: false, index: true},
	password: String,
	email: String,
	position: String,
	status: String
});

UserSchema.pre('save', async function(next){
	// const this = user;
	// if(!this.isModifed('password')){
	// 	return next();
	// }
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(this.password, salt);
	this.password = hash;
	next();
});

UserSchema.methods.comparePasswords = function(password){
	return bcrypt.compare(password, this.password); 
};


export default mongoose.model('User', UserSchema);