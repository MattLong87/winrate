var MOCK_DASHBOARD_DATA = {
	"username": "MattLong87",
	"myFirstName": "Matthew",
	"overallWinrate": 36,
	"recentPlayers": ["Jon", "Jay", "Carrie", "Kyle"],
	"recentSessions": generateSessions(3)
}

function getDashboardInfo(callback) {
	setTimeout(function(){
		callback(MOCK_DASHBOARD_DATA)}, 100);
};

//Below this line should work with real API data

function displayDashboardInfo(data){
	//Dashboard displays username
	$(".js-username").html(data.username + "'s");
	//User's overall winrate
	$(".js-winrate").html(data.overallWinrate);
	//Populate recent players list
	data.recentPlayers.forEach(function(player){
		var li = "<li>" + player + "</li>";
		$(".js-recent-players").append(li);
	});
	//Populate recent sessions list using Handlebars
	var src = $("#recent-sessions").html()
	var template = Handlebars.compile(src);
	var lis = template({sessions: data.recentSessions});
	$(".js-recent-sessions").append(lis);
}

function getAndDisplayDashboardInfo(){
	getDashboardInfo(displayDashboardInfo);
}

getAndDisplayDashboardInfo();