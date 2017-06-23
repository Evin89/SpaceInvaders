"use strict";

// Collection of enemy objects.
site.collections.EnemyCollection = Backbone.Collection.extend({
	model: site.models.BlockModel
});