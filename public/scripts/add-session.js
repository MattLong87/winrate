var MOCK_HISTORY_DATA = {
	"username": "MattLong87",
	"allGames": ["Agricola", "Puerto Rico", "Ticket to Ride"],
	"allPlayers": ["Matthew", "Jon", "Steven", "Carrie"]
}

function getHistory(callback) {
	let settings = {
		url: "http://localhost:8080/api/history",
		dataType: "json",
		method: "GET",
		success: function(data) {callback(data)}
	}
	$.ajax(settings);
};

//Below this line should work with real API data

//global variable to store API response to add more players
var data;

function populateForms(_data){
	data = _data;
	//Populate games list using Handlebars
	// var src = $("#games").html()
	// var template = Handlebars.compile(src);
	// var gameOptions = template(data);
	// $("#game").append(gameOptions);
	$('#js-select-game').typeahead({
		hint: true,
		highlight: true,
		minLength: 1
	},
	{
		name: 'game',
		source: substringMatcher(data.allGames)
	});

	//Populate players list using Handlebars
	//Could refactor by making a function for this, duplicated in
	//event listener below
	// var src = $("#players").html();
	// var template = Handlebars.compile(src);
	// var playerOptions = template(data);
	// $("#player1").append(playerOptions);
	$('#players-input .typeahead').typeahead({
  		hint: true,
  		highlight: true,
  		minLength: 1
	},
	{
		name: 'players',
		source: substringMatcher(data.allPlayers)
	});
}

//variable to count players
var players = 1;

//event listener for "add player" button, adds new dropdown box
// $("#js-add-player").click(function(event){
// 	event.preventDefault();
// 	players++;
// 	var dropDown = '<select name="players" id="player' + players +'" class = "players-dropdown"></select>';
// 	var src = $("#players").html();
// 	var template = Handlebars.compile(src);
// 	var playerOptions = template(data);
// 	$("#players-input").append(dropDown);
// 	$("#player" + players).append(playerOptions);
// })

//need playersArray global to access for form submission
var playersArray;

//update "Winner" options when a new player is added
// $("#players-input").on("change", ".players-dropdown", function(e){
// 	$("#winner").html("");
// 	playersArray = [];
// 	for(var i = 1; i <= players; i++){
// 		var player = $("#player" + i).val();
// 		playersArray.push(player);
// 	}
// 	playersArray.forEach(function(player){
// 		//addOption is a custom jQuery plugin:
// 		//$("#winner").append("<option>" + player + "</option>");
// 		$("#winner").addOption(player);
// 	});
// })

//prevent form from being submitted when pressing enter
$("#js-add-session").on("keyup keypress", function(e){
	var keyCode = e.keyCode || e.which;
	if (keyCode === 13){
		e.preventDefault();
		return false;
	}
})

$("#js-add-player").keypress(function(event){
	if (event.which === 13){
		//have to use this .tt-input class, apparent bug in typeahead
		var newPlayer = $("#players-input .tt-input").typeahead("val");
		$("#js-players-added").append(newPlayer + " ");
		//add a hidden input with the player's name
		var hiddenInput = "<input class = 'player' type = 'text' value = " + newPlayer +" name = 'player'>";
		$("#hidden-inputs").append(hiddenInput);
		//clears out text box after entering
		$("#players-input .typeahead").typeahead('val', '');
	}
})

//Event listener for form submission
$("#js-add-session").on("submit", function(event){
	event.preventDefault();
	// var newSession = {
	// 	game: $("#game").val(),
	// 	players: playersArray,
	// 	winner: $("#winner").val()
	// };
	var newSession = $("#js-add-session").serialize();
	console.log(newSession)
	// $.ajax({
	// 	url: "http://localhost:8080/api/users/" + data.id + "/sessions",
	// 	method: "POST",
	// 	dataType: "json",
 //        contentType: "application/json",
	// 	data: newSession,
	// 	success: function(data){
	// 		sessionAddSuccess(data);
	// 	}
	// });
})

function sessionAddSuccess(data){
	$(".js-game").html(data.game);
	$(".js-players").html(data.players.join(", "));
	$(".js-winner").html(data.winner);
}

function getAndPopulateForms(){
	getHistory(populateForms);
}

getAndPopulateForms();

//Allows typeahead to autosuggest
var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;
    matches = [];
    substrRegex = new RegExp(q, 'i');
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });
    cb(matches);
  };
};