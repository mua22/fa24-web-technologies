console.log("ajax.js script loaded");

$(function () {
  // this will be executed after page load;
  console.log("Page Load Completed");
  $("#menu a").on("click", linkClicked);
});

console.log("ajax.js script load completed");

function linkClicked(e) {
  e.preventDefault();
  console.log(e.target.href);
  console.log("Ajax Started");
  $.ajax({
    url: e.target.href,
    method: "GET",
    success: pageFetched,
  });

  console.log("Ajax Call Finished");
}

function pageFetched(content) {
  $("#container").empty();
  $("#container").append(content);
  console.log("page Fetched");
}
