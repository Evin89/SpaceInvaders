site.models.BlockModel = Backbone.Model.extend({
	initialize: function(attributes){
		this.positionX = attributes.positionX;
		this.positionY = attributes.positionY;
		this.exists = true;
	}
});
