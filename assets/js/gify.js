// create array of topics
var tings = ["dodge", "duck", "dip", "dive", "dodge again"];
// for loop to create button for topics array
$("#submit").on("click", function() {
  event.preventDefault();
  var newTings = $("#addTings").val().trim();
  tings.push(newTings);
  buttons();
  console.log(tings);  
});


function buttons(){
  $("#tings").empty();
  for (var i = 0; i < tings.length; i++) {
  var buttons = $('<button type="submit" class="btn btn-success">').text(tings[i]).attr("data-anything",tings[i]).attr("id","anything-button");
  buttons.appendTo(`#tings`);
  }
};

buttons();

//click event for buttons
$(document).on("click", "#anything-button",function() {
    // Grabbing and storing the data-animal property value from the button
    var anything = $(this).attr("data-anything");

    // Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      anything + "&api_key=FXVZKN8jBgfeM4X7Ilg2PlL26dAzt9wM&limit=10";
    console.log(anything);
    // Performing an AJAX request with the queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After data comes back from the request
      .then(function(response) {
        console.log(queryURL);

        console.log(response);
        // storing the data from the AJAX request in the results variable
        var results = response.data;

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

          // Creating and storing a div tag
          var animalDiv = $("<div>");

          // Creating a paragraph tag with the result item's rating
          // var p = $("<p>").text("Rating: " + results[i].rating);

          // Creating and storing an image tag
          var animalImage = $("<img>");
          // Setting the src attribute of the image to a property pulled off the result item
          animalImage.attr("src", results[i].images.fixed_height.url);

          // Appending the paragraph and image tag to the animalDiv
          // animalDiv.append(p);
          animalDiv.append(animalImage);

          // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
          $("#gifs").prepend(animalDiv);
        }
      });
  });