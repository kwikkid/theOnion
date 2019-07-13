var mongoose = require("mongoose");
var Schema = mongoose.Schema;

varArticleSchema = new Schema({
	name:

});
//This is my model from the above schema, using mongoose's model method//
var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;