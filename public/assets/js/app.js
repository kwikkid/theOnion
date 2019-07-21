$(document).ready(function() {
	$(".save-btn").on("click", function() {
		let articleId = $(this).data("id");
		let count = 0;
		// let articleId = $(this).data("id");

		var countData = {
			articleId: articleId
		};

		$.post("/saved-articles/" + countData.articleId, countData, function(
			data
		) {
			console.log(data);
			count = data.data;
			console.log("here is the count: " + count);

			console.log(count);
			$("#badge-count").html(count);
			console.log(count);
		});
		// location.reload("/");
	});

	$("#clear").on("click", function() {
		$.get("/clear").then(function(data) {
			location.reload("/articles");
		});
	});

	$(".add").on("click", function() {
		var articleId = $(this).attr("data-id");
		console.log("this is the article Id: " + articleId);
		var comment = $("#modal-" + articleId).val();

		console.log("this is the comment" + comment);
		var commentDiv = $(
			"<div class='commentArea'>" +
				comment +
				"<span style='color:red'>x</span></div>"
		);
		console.log(comment);
		$("#p-" + articleId).append(commentDiv);
		$("span").on("click", function() {
			$(this)
				.closest(".commentArea")
				.remove();
		});

		$.ajax({
			method: "POST",
			url: "/save-comment/" + articleId,
			data: {
				body: comment
			}
		}).then(function(data) {
			console.log(data);
			// $("#modal-" + articleId).empty();
		}); //insert articleId)
		//we send over the comment variable as an object.
		//the server will create a comment in the db//
		//it will find one Article with an id equal to req.params.id
		//update article to use new: true//
		//we want the query to return the article and its note//
	});
	$(".show-comments").on("click", function() {
		var articleId = $(this).attr("button-id");
		console.log("articleId" + articleId);
		$.ajax({
			method: "GET",
			url: "/save-comment/" + articleId
		}).then(function(data) {
			console.log(data);
			$("#p-" + articleId).append("<div id=all-comments>");
			if (data.comment) {
				var allComments = $("<div>" + data.comment.body + "</div>");
				$("#all-comments").append(allComments);
			}
		});
	});
});
