var MOCK_SESSIONS_DATA = {
	"username": "MattLong87",
	"myFirstName": "Matthew",
	"sessions": generateSessions(50)
}

function getSessions(callback) {
	let settings = {
		url: "http://localhost:8080/api/allSessions",
		dataType: "json",
		method: "GET",
		success: function(data) {callback(data)}
	}
	$.ajax(settings);
};

var id;

//Below this line should work with real API data

function displaySessions(data){
	id = data.id;
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
	// $.ajax({
	// 	url: "http://localhost:8080/api/users/" + id + "/sessions/" + ???,
	// 	method: "DELETE",
	// 	success: function(){
	// 		$(this).parent().remove();
	// 	}
	// });
})

getAndDisplaySessions();