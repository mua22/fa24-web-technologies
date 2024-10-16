console.log("Script loading ...");

$(function () {
  console.log("Dom Loaded");
  $("#menu a").on("click", linkClicked);
  $("#container").on("mouseenter", "h1", function () {
    $(this).css("background-color", "black");
    $(this).css("color", "white");
  });
});

function linkClicked(event) {
  event.preventDefault();
  //   console.log(event);
  let url = event.target.href;
  //   let url = $(this).attr("href");
  console.log(url);
  console.log("AJAX Request Initiated");
  $.ajax({
    url: url,
    method: "GET",
    success: responseHandler,
  });

  console.log("Request Sent");
}
function responseHandler(response) {
  console.log("Response Arrived");
  console.log(response);
  $("#container").html(response);
}
console.log("scriot loading completed");
