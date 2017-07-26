var mongoose   = require('mongoose');

var commentSchema = new mongoose.Schema({
  test: String,
  author: String
});

module.exports = mongoose.model('Comment', commentSchema);
