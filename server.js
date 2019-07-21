var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// Scrape Tools //
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models //
var db = require("./models");

var PORT = process.env.PORT || 8080;
var app = express();

// Use morgan to log requests //
app.use(logger("dev"));
// We set the public directory as the root //
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Fire up Handlebars //

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Connect to Mongo DB //
mongoose.connect("mongodb://localhost/theOnionApp", { useNewUrlParser: true });

// Routes

app.get("/", function(req, res) {
	res.redirect("/articles");
});

app.get("/scrape", function(req, res) {
	console.log("scraping...");
	var result = [];
	axios.get("https://www.theonion.com/").then(function(response) {
		var $ = cheerio.load(response.data);
		$(".content-meta__headline__wrapper").each(function(i, element) {
			console.log("result variable");
			var content = {
				title: $(this)
					.children("a")
					.attr("title"),
				link: $(this)
					.children("a")
					.attr("href")
			};
			if (content.title && content.link) {
				result.push(content);
			}
		});

		db.Article.create(result)
			.then(function(dbArticle) {
				console.log("5");
				console.log(dbArticle);
				res.redirect("/articles");
			})
			.catch(function(err) {
				console.log(err);
				res.redirect("/articles");
			});
	});
});

// GET route for all articles //
app.get("/articles", function(req, res) {
	db.Article.find({}).then(function(dbArticles) {
		res.render("index", { db_articles: dbArticles });
	});
});

app.post("/saved-articles/:id", function(req, res) {
	db.Article.update({ _id: req.params.id }, { $set: { saved: true } })
		.then(function(dbArticles) {
			db.Article.countDocuments({ saved: true }, function(err, data) {
				console.log("before data");
				res.json({ data });
				// console.log(data);
			});
		})
		.catch(function(err) {
			res.json({ ok: false, error: err });
		});
	//here we store the ID supplied by the client. We use the ID to update.
});
///DONT LOOOK DOWN HERE//

// GET route for saved articles //
app.get("/saved-articles", function(req, res) {
	db.Article.find({}).then(function(dbArticles) {
		res.render("saved", { db_articles: dbArticles });
	});
});
// GET route to clear articles //
app.get("/clear", function(req, res) {
	db.Article.remove({}).then(function() {
		res.render("index");
	});
});
//POST route to add comments to db //

//POST route to add comments to Article//
app.post("/save-comment/:id", function(req, res) {
	console.log(req.body);
	db.Comment.create(req.body)
		.then(function(dbComment) {
			return db.Article.findOneAndUpdate(
				{ _id: req.params.id },
				{ comment: dbComment._id },
				{ new: true }
			);
		})
		.then(function(dbArticle) {
			res.json(dbArticle);
		})
		.catch(function(err) {
			res.json({ ok: false, error: err });
		});
});

app.get("/save-comment/:id", function(req, res) {
	db.Article.findOne({ _id: req.params.id })
		.populate("comment")
		.then(function(dbArticles) {
			res.json(dbArticles);
		})
		.catch(function(err) {
			res.json({ ok: false, error: err });
		});
});
//I need to make a get request to get all notes for the article and display them in a modal or div//
//Add a button for notes//
app.listen(PORT, function() {
	console.log("Listening on port:%s", PORT);
});
