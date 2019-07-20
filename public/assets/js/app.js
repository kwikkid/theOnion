$(document).ready(function() {
	$(".save-btn").on("click", function() {
		let count = 0;
		var articleId = $(this).data("id");

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

	$(".add-comment").on("click", function() {
		var articleId = $(this).data("id");
		var div = $(this).closest(".result-div");
		var button = $("<button/>", {
			class: "btn btn-success save-comment"
		})
			.attr("data-id", articleId)
			.html("Save");

		// ("<button type='button' class='btn save-comment btn-success' id=articleId>Save</button>");
		div.append("<textarea></textarea>").after(button);
		$(".save-comment").on("click", function() {
			console.log(articleId);
			$.ajax({
				method: "PUT",
				url: "/save-comment/" + articleId,
				data: {
					body: $("textarea").val()
				}
			}).then(function(response) {
				console.log(response);
			});
			$("textarea").empty();
		});
	});
});
