// create array of topics
var tings = ["dog", "cat", "bird", "hamster", "rabbit"];
// for loop to create button for topics array
$("#submit").on("click", function() {
  event.preventDefault();
  var newTings = $("#addAnimal").val().trim();
  tings.push(newTings);
  buttons();
  console.log(tings);  
});


function buttons(){
  $("#topics").empty();
  for (var i = 0; i < tings.length; i++) {
  var buttons = $('<button>').text(tings[i]).attr("data-animal",topics[i]).attr("class","animal-button");
  buttons.appendTo(`#topics`);
  }
};

buttons();

//click event for buttons
$(document).on("click", ".animal-button",function() {
    // Grabbing and storing the data-animal property value from the button
    var animal = $(this).attr("data-animal");

    // Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      animal + "&api_key=FXVZKN8jBgfeM4X7Ilg2PlL26dAzt9wM&limit=10";
    console.log(animal);
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
          var p = $("<p>").text("Rating: " + results[i].rating);

          // Creating and storing an image tag
          var animalImage = $("<img>");
          // Setting the src attribute of the image to a property pulled off the result item
          animalImage.attr("src", results[i].images.fixed_height.url);

          // Appending the paragraph and image tag to the animalDiv
          animalDiv.append(p);
          animalDiv.append(animalImage);

          // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
          $("#gifs").prepend(animalDiv);
        }
      });
  });