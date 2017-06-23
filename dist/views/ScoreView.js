"use strict";

site.views.ScoreView = Backbone.View.extend({
	initialize: function initialize() {
		site.events.on("gameOverScreen", function () {});
	}

});