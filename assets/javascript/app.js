var apiKey = "dc6zaTOxFJmzC";
// var topics = ["The Big Lebowski", "Reqiuem for a Dream", "The Hateful Eight", "Pulp Fiction", "Friday the 13th", "Chucky", 
// "Catch Me If You Can", "Wall-E", "Finding Dory", "Mr. Nobody", "The Lion King", "The Notebook"];
var emptyMovieArray = [];
var chosenMovie = null;
var queryURL = "http://www.omdbapi.com/?t=" + chosenMovie + "&y=&plot=short&r=json";
var results = null;

// giphy object will contain and display the buttons
var buttonObj = {
	// Array will display the initial movie buttons and display new ones using the search box
	topics:["The Big Lebowski", "Reqiuem for a Dream", "The Hateful Eight", "Pulp Fiction", "Friday the 13th", "Chucky", 
"Catch Me If You Can", "Wall-E", "Finding Dory", "Mr. Nobody", "The Lion King", "The Notebook"],
	
	self : this,

	displayMovie:function(){
	// Will loop through the topics array
		for (i = 0; i < buttonObj.topics.length; i++){
		// Creates a new, temporary button div called "movieBtn"
		var movieBtn = $("<button>");
		// Adds an attribute to the movieBtn that gives each button an id of value "i"
		movieBtn.attr("id", i);
		// 
		$(".movieButtons").append("<button id = " + i + ">" + buttonObj.topics[i] + "</button>");

		var chosenMovie = $("#movieTags").val().trim();
		console.log(chosenMovie);
		}
	 },

	displayMovie2:function(movieArray){
		$(".movieButtons").empty();
		for (i = 0; i < buttonObj.topics.length; i++){
		var a = $("<button>");
		a.addClass("movie");
		a.attr("data-name", buttonObj.topics[i]);
		a.text(buttonObj.topics[i]);
		$(".movieButtons").append(a);
		}
	},

	addMovie:function(){
		$("#submitBtn").on("click", function(){
			var newMovie = $("#movieTags").val().trim();
			buttonObj.topics.push(newMovie);
			buttonObj.displayMovie2(newMovie);
		})
	},
	getMovieClickedOn:function(){
		$("button").on("click", function(){
			var movieClicked = $(this).attr("data-name");
			console.log(movieClicked);
			queryURL = "http://api.giphy.com/v1/gifs/search?q=" + movieClicked + "&api_key=dc6zaTOxFJmzC&limit=10";;
			// console.log(queryURL);
			gifDisplay();
			return movieClicked;
		})
	}

};


function ajaxCall(){
$.ajax({
	url: queryURL,
	method: "GET"
}).done(function(response){
	 // var rating = response.Rated;
	 // $(".movies-view").append("<div id = 'thisRating'>");
	 // $("#thisRating").html("Rating: " + rating);
	 // $("#movies-view").append("<div");
	 results = response.data;
	 buttonObj.displayMovie2(buttonObj.topics);
	 buttonObj.addMovie();
	 var movieClick = buttonObj.getMovieClickedOn();
	 console.log(queryURL);
	 //displayMovieData();
	 // var movieDiv = $("<div>");
	 // var p = ("<p>");
	 // p.append("Rating: " + results[0].rating);
	
	 //gifDisplay();
	 imageConverter();
 });
}

// Displays the gif's based upon the button that is clicked
function gifDisplay(){
	 for (var i = 0; i < results.length; i++) {

        var movieDiv = $("<div>");
        // Create a paragraph tag with the result item's rating
        var p = $("<p>");
        p.append("Rating: " + results[i].rating);
        var movieGif = $("<img>");
        movieGif.attr("src", results[i].images.fixed_height_still.url);
        // Append the paragraph and image tag to the animalDiv
        movieGif.attr("data-still", results[i].images.fixed_height_still.url);
        movieGif.attr("data-animate", results[i].images.fixed_height.url)
        movieGif.attr("data-state", "still");
        movieGif.attr("class", "gif");
        movieDiv.append(p);
        movieDiv.append(movieGif);
        $(".movies-view").prepend(movieDiv);
    }
}

function imageConverter(){
	$(".gif").on("click", function(){
		var state = $(this).attr("data-state");
		console.log(state);

		if(state === "still"){
			var dataAnimate = $(this).attr("data-animate");
			console.log("dataAnimate: " + dataAnimate);
			$(this).attr("src", dataAnimate);
			$(this).attr("data-state", "animate");
		}
		else{
			var dataStill = $(this).attr("data-still");
			console.log("dataStill: " + dataStill);
			$(this).attr("src", dataStill);
			$(this).attr("data-state", "still");
		}

	})
}


 $(document).on("click", ajaxCall, buttonObj.displayMovie2(buttonObj.topics));

      // Calling the renderButtons function to display the intial buttons
      //buttonObj.displayMovie2(buttonObj.topics);


// $(function (){
// 	var moviesMasterArray = ["The Matrix", "Second Hand Lions", "The Bucket List","Man on Fire", "The Bone Collector", "The Silence of the Lambs", "Hannibal",
// 	"Inglorious Bastards", "Atlantis", "Howl's Moving Castle", "Tarzan"];
// 		$("#movieTags").autocomplete({
// 		source:moviesMasterArray
// 		});
// 	});

// function displayMovieData(){
// 	var rating = response.Rated;
// 	// $("#movies-view").append("<div");
// 	var image = response.Poster;
// 	 console.log(movieClick);
// 	 $("movies-view").append($("<img>").attr("src, image"));
// }	