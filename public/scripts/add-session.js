var MOCK_HISTORY_DATA = {
	"username": "MattLong87",
	"games": ["Agricola", "Puerto Rico", "Ticket to Ride"],
	"players": ["Matthew", "Jon", "Steven", "Carrie"]
}

function getHistory(callback) {
	setTimeout(function(){
		callback(MOCK_HISTORY_DATA)}, 100);
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

//update "Winner" options when a new player is added
$("#players-input").on("change", ".players-dropdown", function(e){
	$("#winner").html("");
	var playersArray = [];
	for(var i = 1; i <= players; i++){
		var player = $("#player" + i).val();
		playersArray.push(player);
	}
	playersArray.forEach(function(player){
		$("#winner").addOption(player);
		//$("#winner").append("<option>" + player + "</option>");
	});
})

function getAndPopulateForms(){
	getHistory(populateForms);
}

getAndPopulateForms();