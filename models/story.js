import mongoose, { Schema } from 'mongoose';

const StorySchema = new Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  status: { type: String, require: true },
  risk: { type: String, require: true },
  url: { type: String, require: true, unique: true },
  createdAt: { type: Date, require: true, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }
}); 

export default mongoose.model('Story', QuestionSchema);