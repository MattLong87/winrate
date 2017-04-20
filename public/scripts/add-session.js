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
	var src = $("#games").html()
	var template = Handlebars.compile(src);
	var gameOptions = template(data);
	$("#game").append(gameOptions);

	//Populate players list using Handlebars
	//Could refactor by making a function for this, duplicated in
	//event listener below
	var src = $("#players").html();
	var template = Handlebars.compile(src);
	var playerOptions = template(data);
	$("#player1").append(playerOptions);
}

//variable to count players
var players = 1;

//event listener for "add player" button, adds new dropdown box
$("#js-add-player").click(function(event){
	event.preventDefault();
	players++;
	var dropDown = '<select name="players" id="player' + players +'" class = "players-dropdown"></select>';
	var src = $("#players").html();
	var template = Handlebars.compile(src);
	var playerOptions = template(data);
	$("#players-input").append(dropDown);
	$("#player" + players).append(playerOptions);
})

//need playersArray global to access for form submission
var playersArray;

//update "Winner" options when a new player is added
$("#players-input").on("change", ".players-dropdown", function(e){
	$("#winner").html("");
	playersArray = [];
	for(var i = 1; i <= players; i++){
		var player = $("#player" + i).val();
		playersArray.push(player);
	}
	playersArray.forEach(function(player){
		//addOption is a custom jQuery plugin:
		//$("#winner").append("<option>" + player + "</option>");
		$("#winner").addOption(player);
	});
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
	console.log($("#js-add-session").serialize())
	$.ajax({
		url: "http://localhost:8080/api/users/" + data.id + "/sessions",
		method: "POST",
		dataType: "json",
        contentType: "application/json",
		data: newSession,
		success: function(data){
			sessionAddSuccess(data);
		}
	});
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