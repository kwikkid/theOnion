$(".save-btn").on("click", function() {
	var articleId = $(this).data("id");
	$.ajax({
		url: "/saved-articles/" + articleId,
		type: "PUT",
		data: articleId,
		success: function(data) {
			console.log(data);
			if (data.ok) {
				location.reload("/articles");
			}
		}
	});
});

$("#clear").on("click", function() {
	$.get("/clear").then(function(data) {
		location.reload("/articles");
	});
});

$(".add-note").on("click", function() {
	var articleId = $(this).data("id");
	var div = $(this).closest(".result-div");
	var button = $("<button/>", {
		id: articleId,
		class: "btn btn-success",
		title: "Save"
	}).html("save");

	// ("<button type='button' class='btn save-note btn-success' id=articleId>Save</button>");
	div.append("<textarea></textarea>").after(button);
});

$(".save-note").on("click", function() {
	console.log("click");
	var articleId = $(this)
		.parent(".save-btn")
		.data("id");
	console.log(articleId);
});
// $("#note-button").on("click", function() {
// 	var articleId = $(this).data("id");
// 	$.ajax({
// 		url:
// 	})
// })
