var MOCK_SESSIONS_DATA = {
	"username": "MattLong87",
	"myFirstName": "Matthew",
	"sessions": generateSessions(50)
}

function getSessions(callback) {
	setTimeout(function(){
		callback(MOCK_SESSIONS_DATA)}, 100);
};

//Below this line should work with real API data

function displaySessions(data){
	//Displays username
	$(".js-username").html(data.username + "'s");
	//Populate sessions list using Handlebars
	var src = $("#sessions").html()
	var template = Handlebars.compile(src);
	var lis = template({sessions: data.sessions});
	$(".js-sessions").append(lis);
}

function getAndDisplaySessions(){
	getSessions(displaySessions);
}

getAndDisplaySessions();