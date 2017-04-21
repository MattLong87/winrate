function getHistory(callback) {
	let settings = {
		url: "http://localhost:8080/api/history",
		dataType: "json",
		method: "GET",
		success: function(data) {callback(data)}
	}
	$.ajax(settings);
};

//global variable to store API response to add more players
var data;

function populateForms(_data){
	data = _data;
	//Populate games list using typeahead
	$('#js-select-game').typeahead({
		hint: true,
		highlight: true,
		minLength: 1
	},
	{
		name: 'game',
		source: substringMatcher(data.allGames)
	});

	//Populate players list using typeahead
	$('#players-input .typeahead').typeahead({
  		hint: true,
  		highlight: true,
  		minLength: 1
	},
	{
		name: 'players',
		source: substringMatcher(data.allPlayers)
	});
}

//need playersArray global to access for form submission
var playersArray = [];

//update "Winner" options when a new player is added
function updateWinners(){
	$("#winner").html("");
	playersArray.forEach(function(player){
		//addOption is a custom jQuery plugin:
		//$("#winner").append("<option>" + player + "</option>");
		$("#winner").addOption(player);
	});
}

//prevent form from being submitted when pressing enter
$("#js-add-session").on("keyup keypress", function(e){
	var keyCode = e.keyCode || e.which;
	if (keyCode === 13){
		e.preventDefault();
		return false;
	}
})

//Event listener when pressing enter on player input
$("#js-add-player").keypress(function(event){
	if (event.which === 13){
		//have to use this .tt-input class, apparent bug in typeahead
		var newPlayer = $("#players-input .tt-input").typeahead("val");
		playersArray.push(newPlayer);
		updateWinners();
		$("#js-players-added").append("<span class = 'addedPlayer'>" + newPlayer + "</span>");
		//add a hidden input with the player's name
		//instead of these hidden inputs, could use our playersArray variable
		var hiddenInput = "<input class = 'player " + newPlayer + "' type = 'text' value = " + newPlayer +" name = 'players'>";
		$("#hidden-inputs").append(hiddenInput);
		//clears out text box after entering
		$("#players-input .typeahead").typeahead('val', '');
	}
})

//Event listener (with delegation) for clicking player added to remove
$("#js-players-added").on("click", ".addedPlayer", function(event){
	var removedName = $(this).text();
	//remove name from playersArray and update winners list
	var removedPlayerIndex = playersArray.indexOf(removedName);
	if (removedPlayerIndex > -1){
		playersArray.splice(removedPlayerIndex, 1);
	}
	updateWinners();
	//remove hidden input with player's name
	$("." + removedName).remove();
	//remove from players added section
	$(this).remove();
})

//Event listener for form submission
$("#js-add-session").on("submit", function(event){
	event.preventDefault();
	// var newSession = {
	// 	game: $("#game").val(),
	// 	players: playersArray,
	// 	winner: $("#winner").val()
	// };
	var newSession = $("#js-add-session").serialize();
	console.log(newSession)
	$.ajax({
		url: "http://localhost:8080/api/users/" + data.id + "/sessions",
		method: "POST",
		dataType: "json",
      contentType: "application/json",
		data: JSON.stringify(toObject(newSession)),
		success: function(data){
			sessionAddSuccess(data);
		}
	});
})

function toObject(str){
	str = decodeURIComponent(str);
  var split = str.split("&");
  var object = {}
  split.forEach(function(keyValue){
    var arr = keyValue.split("=");
    if (object[arr[0]] !== undefined){
      if (object[arr[0]] instanceof Array){
        object[arr[0]].push(arr[1])
      }
      else {
        object[arr[0]] = [object[arr[0]],arr[1]];
      }
    }
    else{
      object[arr[0]] = arr[1];
    }
  })
  return object;
}

function sessionAddSuccess(data){
	$(".js-game").html(data.game);
	$(".js-players").html(data.players.join(", "));
	$(".js-winner").html(data.winner);
}

function getAndPopulateForms(){
	getHistory(populateForms);
}

getAndPopulateForms();

//Allows typeahead to autosuggest
var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;
    matches = [];
    substrRegex = new RegExp(q, 'i');
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });
    cb(matches);
  };
};