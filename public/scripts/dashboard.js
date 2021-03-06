function getDashboardInfo(callback) {
	let settings = {
		url: "/api/dashboardInfo",
		dataType: "json",
		method: "GET",
		success: function(data) {callback(data)}
	}
	$.ajax(settings);
};

function displayDashboardInfo(data){
	//Dashboard displays username
	$(".js-username").html(data.username + "'s");
	//User's overall winrate
	$(".js-winrate").html(Math.round(data.overallWinrate * 100));
	//Populate recent players list
	data.recentPlayers.forEach(function(player){
		var playerWinrate = Math.floor(player[1]*100)
		var li = "<li>" + player[0] + " " + playerWinrate + "%</li>";
		$(".js-recent-players").append(li);
	});
	//Populate recent sessions list using Handlebars
	var src = $("#recent-sessions").html()
	var template = Handlebars.compile(src);
	var sessions = data.recentSessions.map((session) => {
		session.players = session.players.join(", ");
		return session;
	})
	var lis = template({sessions});
	$(".js-recent-sessions").append(lis);
}

function getAndDisplayDashboardInfo(){
	getDashboardInfo(displayDashboardInfo);
}

getAndDisplayDashboardInfo();