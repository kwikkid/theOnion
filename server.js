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
	console.log("1");
	axios.get("https://www.theonion.com/").then(function(response) {
		console.log("2");
		var $ = cheerio.load(response.data);
		console.log("3");
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

		console.log("4");

		db.Article.create(result)
			.then(function(dbArticle) {
				console.log("5");
				console.log(dbArticle);
				res.redirect("/articles");
			})
			.catch(function(err) {
				console.log(err);
				res.json(err);
			});
	});
});

// GET route for all articles //
app.get("/articles", function(req, res) {
	db.Article.find({})
		.then(function(dbArticles) {
			res.render("index", { db_articles: dbArticles });
		})
		.catch(function(err) {
			res.json(err);
		});
});

app.put("/saved-articles/:id", function(req, res) {
	var condition = req.params.id;
	db.Article.update({ _id: condition }, { $set: { saved: true } })
		.then(function(dbArticles) {
			res.json({ ok: true });
		})
		.catch(function(err) {
			res.json({ ok: false, error: err });
		});
	//here we store the ID supplied by the client. We use the ID to update.
});

// GET route for saved articles //
app.get("/saved-articles", function(req, res) {
	db.Article.find({}).then(function(dbArticles) {
		res.render("saved", { db_articles: dbArticles });
	});
});

app.get("/clear", function(req, res) {
	db.Article.remove({}).then(function() {
		res.render("index");
	});
});

// POST route to add to saved articles //
app.post("/saved-articles", function(req, res) {});
app.listen(PORT, function() {
	console.log("Listening on port:%s", PORT);
});
