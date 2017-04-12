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

function populateForms(data){
	//Populate games list using Handlebars
	var src = $("#games").html()
	var template = Handlebars.compile(src);
	var gameOptions = template(data);
	$("#game").append(gameOptions);

	//Populate players list using Handlebars
	var src = $("#players").html();
	var template = Handlebars.compile(src);
	var playerOptions = template(data);
	$("#player1").append(playerOptions);
}

function getAndPopulateForms(){
	getHistory(populateForms);
}

getAndPopulateForms();