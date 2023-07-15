const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  comment:{
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
},{timestamps:true});

module.exports = mongoose.model('Comment', commentSchema);
