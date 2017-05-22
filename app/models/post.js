var mongoose = require( 'mongoose' );

var postSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  body: {
    type: String
  },
  author: {
  	type: mongoose.Schema.Types.ObjectId,
  	ref: 'User'
  }
});

// methods ======================


module.exports = mongoose.model('Post', postSchema);