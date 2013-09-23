define( [
	'backbone'
], function ( Backbone ) {
	var user_model = Backbone.Model.extend( {
		defaults: {
			title: ''
		},
		urlRoot: '/',

		url: function () {
			return this.urlRoot + 'lists';
		},

		initialize: function () {
			this.fetch()
		}

	} );
	return user_model;
} );
