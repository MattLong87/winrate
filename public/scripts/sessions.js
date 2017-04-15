var MOCK_SESSIONS_DATA = {
	"username": "MattLong87",
	"myFirstName": "Matthew",
	"sessions": generateSessions(50)
}

function getSessions(callback) {
	$.getJSON("http://localhost:8080/api/allSessions", function(data){
		callback(data);
	});
	// setTimeout(function(){
	// 	callback(MOCK_SESSIONS_DATA)}, 100);
};

//Below this line should work with real API data

function displaySessions(data){
	//Displays username
	$(".js-username").html(data.username + "'s");
	//Populate sessions list using Handlebars
	var src = $("#sessions").html()
	var template = Handlebars.compile(src);
	var lis = template({sessions: data.sessions.map((session) => {
		session.timeStampFormatted = moment(session.timeStamp).format();
		return session;
		})
	});
	$(".js-sessions").append(lis);
}

function getAndDisplaySessions(){
	getSessions(displaySessions);
}

$("body").on("click", ".js-delete-session", function(e){
	e.preventDefault();
	//$.ajax({})
	//put the remove in the callback in case it fails
	$(this).parent().remove();
})

getAndDisplaySessions();