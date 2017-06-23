site.routers.GameRouter = Backbone.Router.extend({

		// Routes in GameRouter
		routes: {
		"": "startGame",
		"startGame": "startGame",
		"gameScreen": "gameScreen",
		"gameOverScreen": "gameOverScreen"
	},

	// The startGame method.
	startGame: function () {
		site.events.trigger("sadas");
		$('#startGame_content').show();
		$('#gameScreen_content').hide();
		$('#gameOverScreen_content').hide();
	},

		// The gameScreen method.
	gameScreen: function () {
		site.events.trigger("GameView");
		$('#startGame_content').hide();
		$('#gameScreen_content').show();
		$('#gameOverScreen_content').hide();
	},

	// The gameOverScreen method.
	gameOverScreen: function () {
		site.events.trigger("gameOverScreen");
		$('#startGame_content').hide();
		$('#gameScreen_content').hide();
		$('#gameOverScreen_content').show();
	}

});
