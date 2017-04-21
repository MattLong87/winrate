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
	var sessionId = $(this).attr("data-id");
	var self = this;
	$.ajax({
		url: "http://localhost:8080/api/users/" + id + "/sessions/" + sessionId,
		method: "DELETE",
		success: function(){
			$(self).parent().remove();
		}
	});
})

getAndDisplaySessions();