var MOCK_DASHBOARD_DATA = {
	"username": "MattLong87",
	"myFirstName": "Matthew",
	"overallWinrate": 36,
	"recentPlayers": ["Jon", "Jay", "Carrie", "Kyle"],
	"recentSessions": [
		{
			"game": "Agricola",
			"players": ["Matthew", "Jon", "Jay"],
			"winner": "Jon",
			"timeStamp": 1492022116372
		},
		{
			"game": "Viticulture",
			"players": ["Matthew", "Jon", "John", "Kyle", "Carrie"],
			"Winner": "Kyle",
			"timeStamp": 1492022116372
		},
		{
			"game": "Galaxy Trucker",
			"players": ["Matthew", "John", "Kyle"],
			"Winner": "John",
			"timeStamp": 1492022116372
		}
	]
}

function getDashboardInfo(callback) {
	setTimeout(function(){
		callback(MOCK_DASHBOARD_DATA)}, 100);
};

//Below this line should work with real API data

function displayDashboardInfo(data){
	$("body").append(JSON.stringify(data));
}

function getAndDisplayDashboardInfo(){
	getDashboardInfo(displayDashboardInfo);
}

getAndDisplayDashboardInfo();