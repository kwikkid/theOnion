var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var uniqueValidator = require("mongoose-unique-validator");

var ArticleSchema = new Schema({
	title: {
		type: String,
		required: true,
		trim: true,
		unique: true
	},
	link: {
		type: String,
		unique: true
	},
	saved: {
		type: Boolean,
		default: false
	}
	// comment: {
	// 	type: Schema.Types.ObjectId,
	// 	ref: "Comment"
	// }
});

//This is my model from the above schema, using mongoose's model method//

var Article = mongoose.model("Article", ArticleSchema);
ArticleSchema.plugin(uniqueValidator);
module.exports = Article;
