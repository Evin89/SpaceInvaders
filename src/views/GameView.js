site.views.GameView = Backbone.View.extend({

	// initialize method
	initialize: function () {
		var player = null;
		var gameOver = false;
		$(document).on('keydown', this.keyAction);
		site.events.on("GameView", this.makePlayer, this);
		site.events.on("GameView", this.checkCollision, this);
	},

	// method that makes a new instance of the player class
	makePlayer: function () {
		// make player.
		player = new site.models.PlayerModel({
			score: 0,
			position: 0,
			health: 100
		});

		// set boards.
		$('#score').text(player.score);
		$('#health').text(player.health);

		// if player is made, make playerBlock.
		if (player != null) {
			$("#gameBoard").append('<div id="playerBlock" class="block playerBlock"></div>');
			this.Timer();
		}
	},

	// method that sets a timer at speed to execute several functions
	Timer: function () {
		var speed = 1000;
		// console.log("making enemies!");
		timer = setInterval ((this.generate).bind(this), speed);
		timer = setInterval ((this.moveEnemies).bind(this), speed);
		timer = setInterval ((this.checkPlayerHealth).bind(this), speed);

	},

	// method that generatoes enemies from the enemy class.
	generate: function() {

		// if game is running and not over.
		if (this.gameOver != true){
			var rndX =  Math.floor((Math.random() * 12))*50;
			var enemy = new site.models.BlockModel({
				positionX: rndX,
				positionY: 0
			});
			this.collection.push(enemy);
			this.showEnemyBlocks();
		}
	},

	// method that actually shows the enemies on the screen.
	showEnemyBlocks: function(){
		// clear all blocks to avoid duplicates.
		$('.enemyBlock').remove();
		// show block for every block in collection.
		this.collection.forEach(function(enemy, index){
			$("#gameBoard").append('<div id="'+index+'" class="block enemyBlock" style="left: '+enemy.positionX+'px; margin-top: '+enemy.positionY+'px !important"></div>');
		});
	},

	// Method that moves the enemies on the screen.
	moveEnemies: function (){
		var collection = this.collection;
		this.collection.forEach(function(enemy, index){

			// If there are no enemies, return
			if (!enemy){
				return;
			}
			// Else move the enemeis
			else if ((enemy.positionY > 500)){
				player.health += -10;
				$('#health').text(player.health);
				collection.remove(enemy);
			} else {
				enemy.positionY += 50;
			}

		});
	},

	// Method that handles the keyevents to move the player block.
	keyAction: function(e) {
		// get keyCode.
		var code = e.keyCode || e.which;
		// console.log(code);

		// switch for what to do on which keyCode.
		switch (code) {
			case 65:
			player.position -= 50;
			break;
			case 68:
			player.position += 50;
			break;
			default:
		}

		// If statement to contrain the playerbox to the playable screen.
		if ((player.position > -1) && (player.position < 551))
		{
			// remove current showing of playerBlock.
			$("#playerBlock").remove();
			// append new playerBlock on new position.
			$("#gameBoard").append('<div id="playerBlock" class="block playerBlock" style="left:'+ player.position+'px"></div>');
		} else {
			return;
		}
	},

	// Method that checks if the enemeies collide with the player object.
	checkCollision: function () {

		if (player){
			timer = setInterval (doCheck.bind(this), 100);

			function doCheck(){
				var collection = this.collection;

				this.collection.forEach(function(enemy, index){
					if (enemy){
						// If they collide, this enemy is removed, and the player score is adjusted and shown.
						if (enemy.positionX == player.position && (enemy.positionY == 550 || enemy.position==600)){
							collection.remove(enemy);
							player.score += +1;
							$("#score").text(player.score);
						}

					}
				});

			}
		}
	},

	// Method checks the health of the player.
	checkPlayerHealth: function(){
		if(player.health < 1){
			this.collection.reset();
			player.destroy();
			GameOver = true;
			// Triggering the new view.
			window.location.href = '#gameOverScreen';
		}
	}

});
