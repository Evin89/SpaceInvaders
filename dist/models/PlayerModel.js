"use strict";

site.models.PlayerModel = Backbone.Model.extend({
  initialize: function initialize(attributes) {
    this.score = 0;
    this.health = 100;
    this.position = 0;
  },
  defaults: {
    score: 0,
    health: 100,
    position: 0
  }
});