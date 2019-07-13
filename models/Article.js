var mongoose = require("mongoose");
var Schema = mongoose.Schema;

varArticleSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	link: {
		type: String,
		required: true
	},
	comment: {
		type: Schema.Types.ObjectId,
		ref: "Comment"
	}
});
//This is my model from the above schema, using mongoose's model method//
var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
