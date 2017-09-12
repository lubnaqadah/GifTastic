
	
	var food = ["Fries", "Noodles", "Pasta", "Sushi", "Hamburger", "Cake", "Meatballs", "Salad", "Pizza", "Icecream", "Pancake"];
	var result;
      function renderButtons() {

		  $("#display").empty();
		  $("#keys").empty();
		  
		  for (var i = 0; i< food.length; i++){
			 
			  $("#keys").append("<button class='btn btn-dark'>" + food[i] + "</button>");
		  }
      }

      $("#add").on("click", function(event) {
        event.preventDefault();
			  if ($("#newFood").val()){
			  var input = $("#newFood").val();
			  input = input.trim();
			  input = input.charAt(0).toUpperCase() + input.slice(1);
			  food.push(input);
			  console.log(input);
			renderButtons();
			  $("#newFood").val("");
				  }
      });

      renderButtons();
	
	
$(document).on("click", "#keys button", function() {
	
	$("#display").empty();
	
      var name = $(this).text();
	  console.log(name);
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        name + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {
        console.log(response);
        

		  result = response.data;
		  console.log(result.length);
        if (result.length != 0){
         for (var i = 0; i < result.length; i++) {

			 var foodDiv = $("<div class='card'>");
			 var p = $("<p>");
			 p.text("Rating: " + result[i].rating);
			 p.addClass("card-text");
			 var image = $("<img>");
			 image.attr("src", result[i].images.fixed_height_still.url);
			 image.attr("play", result[i].images.fixed_height.url)
			 image.attr("still", result[i].images.fixed_height_still.url)
			 foodDiv.append(image);
			 foodDiv.append(p);
			 $("#display").append(foodDiv);
			
         };
		
		}else{
			 $("#display").append("<p>" + "No Matching Results." + "p");
		 }

      });
    });
//
$(document).on("click", "img", function(){
	console.log("here");
	
	if ($(this).attr("src") == $(this).attr("still")){
		$(this).attr("src", $(this).attr("play"));
	}else{
		$(this).attr("src", $(this).attr("still"));
	}
	
});

