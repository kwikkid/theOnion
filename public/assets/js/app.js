$(".scrape").on("click", function() {
	$.get("/scrape").then(function() {
		alert("Scraped!");
		location.reload("/articles");
		// Reload the page to get the updated list
	});
});

$(".btn-success").on("click", function() {
	var articleId = $(this).data("id");
	$.ajax({
		url: "/saved-articles/" + articleId,
		type: "PUT",
		data: articleId,
		success: function(data) {
			location.reload("/articles");
		}
	});
	$(".badge-success").text(count); //make an update request that changes saved to true //
});

$("#saved-articles").on("click", function() {
	$.get("/saved-articles").then(function(data) {
		location.reload("/saved-articles");
	});
});

$("#clear").on("click", function() {
	$.get("/clear").then(function(data) {
		location.reload("/articles");
	});
});
