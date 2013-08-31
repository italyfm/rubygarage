define( [
	'backbone'
], function ( Backbone ) {
	var items_model = Backbone.Model.extend( {
		defaults : {
			_id   : '',
			title : ''
		},
		url : '/list',
		validate: function(){}
	} );
	return items_model;
} );
