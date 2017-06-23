"use strict";

(function () {
		site.init = function () {

				// create router
				var Game_Router = new site.routers.GameRouter();

				// create collections
				var Enemy_Collection = new site.collections.EnemyCollection();

				// create models
				var playerModel = new site.models.PlayerModel();

				// new Mainview
				new site.views.MainView({
						el: "#startGame",
						router: Game_Router
				});

				// new Gameview
				new site.views.GameView({
						el: "#gameScreen",
						collection: Enemy_Collection,
						router: Game_Router,
						model: playerModel
				});

				// new ScoreView
				new site.views.ScoreView({
						el: "#gameOverScreen_content",
						router: Game_Router
				});

				// start history tracking
				Backbone.history.start();
		};

		// On ready.
		site.$document.on("ready", site.init);
})();