var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
	title: {
		type: String,
		required: true,
		ordered: false,
		trim: true
	},
	link: {
		type: String
	},
	saved: {
		type: Boolean,
		default: false
	},
	comment: {
		type: Schema.Types.ObjectId,
		ref: "Comment"
	}
});

//This is my model from the above schema, using mongoose's model method//

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
