function generateSessions(numSessions){
	var sessions = [];
	var games = ["Agricola", "Ticket to Ride", "Viticulture", "Puerto Rico", "Galaxy Trucker"];
	var players = ["Matthew", "Jon", "Kyle", "Carrie", "Spenser", "Jamie"];

	for (let i = 1; i <= numSessions; i++){
		sessions.push({
			game: games[Math.floor(Math.random()*games.length)],
			players: players.slice(0, Math.floor((Math.random())*4) + 2),
			winner: players[Math.floor(Math.random()*players.length)],
			timeStamp: 1492022116372
		})
	}
	return sessions;
}