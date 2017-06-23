site.views.MainView = Backbone.View.extend({

	events: {
		// ..
	},

	// initialize method that starts the game
	initialize:function(){
		site.events.on("StartGame", this.onStartGame, this);
	},

	onStartGame: function(){
		// ..
	}


});
