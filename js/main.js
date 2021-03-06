'use strict';

//global variables
var board_size          = 3,
    game_board_squares  = new Array(board_size * board_size),
    remaining_moves     = game_board_squares.length - 1,
    x_mark              = 'X',
    o_mark              = 'O',
    player_x            = x_mark,
    player_o            = o_mark,
    current_player,
    current_mark,
    winning_player;

var Ttt = {

	createEmptyGameBoard: function(board) {
    for (var i = 0; i < board.length; i+=1) {
  	  board[i] = "empty";
    }
    return board;
  },

  getPlayerNames: function(){

		if($("#player_x_name").val() !== ""){
			player_x = $("#player_x_name").val() + " (X)";
		} 
		else {
			player_x = "Player X";
		}

		if($("#player_o_name").val() !== ""){
			player_o = $("#player_o_name").val() + " (O)";
		}
		else {
			player_o = "Player O";
		}
  },

  startEndGame: function() {

		if (winning_player == null){
			Ttt.getPlayerNames();
			$("#game-setup").hide();
			$("#play-game").show();
			current_player = player_x; 	// X always has the first turn in tic tac toe
			current_mark = x_mark;
			$("#alerts span").replaceWith("<span>" + current_player + ", your turn...</span>");
			Ttt.playGame();
		}
		else {
				if(winning_player == 'tie') {

					$("#alerts span").replaceWith("<span>It's a Tie!</span>");

				}
				else {

					$("#alerts span").replaceWith("<span>" + winning_player + " is the winner!</span>");
				}

				//reset empty buttons with blank space
				for(var i = 0; i < game_board_squares.length; i+=1){
		
					if(game_board_squares[i] = "empty"){
						$("#game-board button#" + i).replaceWith("<span class='xo'> </span>");
					}
				}
		
				$("#quit-game").hide();
				$("#play-again").show();
		}
  },

  playGame: function() {

		$( "#game-board button" ).click(function (event) {

			var clicked_on_square = event.target.id;

			game_board_squares[clicked_on_square] = current_mark;

			$(this).replaceWith("<span class='xo'>" + current_mark + "</span>");

			Ttt.checkForWinner();

			if (winning_player){
				Ttt.startEndGame();
			}
			else if(Ttt.remaining_moves == 0) {

				winning_player = 'tie';
				Ttt.startEndGame();
			}
			else {
				Ttt.remaining_moves -= 1;
				Ttt.switchPlayer();
			}		
		});
	},

	checkForWinner: function() {

		//winning patterns for a 3x3 board
		var winners_3x3 = 
		[['1','2','3'], ['4','5','6'],
		['7','8','9'],['1','4','7'],
		['2','5','8'],['3','6','9'],
		['1','5','9'],['3','5','7']];


		//loop through all 3x3 winning patterns
		for(var i = 0; i < winners_3x3.length; i+=1){

			// assign a winning pattern(array) to winner
			var winner = winners_3x3[i];

			//check to see if all three have either a 'O' or an 'X'
			// since I am using a zero-based id for matching the pattern, will need to move down by 1
			if(game_board_squares[winner[0] - 1] == 'O'
				 && game_board_squares[winner[1] - 1] == 'O'
				 && game_board_squares[winner[2] - 1] == 'O') {

				winning_player = player_o;
			} 
			else if(game_board_squares[winner[0] - 1] == 'X' 
				&& game_board_squares[winner[1] - 1] == 'X'
				&& game_board_squares[winner[2] - 1] == 'X') {

				winning_player = player_x;
			}
		}
	},

	switchPlayer: function(){

		if(current_player == player_x) {
			current_player = player_o;
			current_mark = o_mark;
		} else {
			current_player = player_x;
			current_mark = x_mark;
		}

		$("#alerts span").replaceWith("<span>" + current_player + ", your turn...</span>");
	}

};


// GAME ACTIONS
$( "#start-game" ).click(function () {
	winning_player == null;
	Ttt.createEmptyGameBoard(game_board_squares);
    Ttt.startEndGame();
});

$( "#play-again" ).click(function () {
	window.location.reload();
});

$( "#quit-game" ).click(function () {
	if (confirm('Are you sure?')) { 
 		window.location.reload();
	}
});