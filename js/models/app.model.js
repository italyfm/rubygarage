define( [
	'backbone'
], function ( Backbone ) {
	var user_model = Backbone.Model.extend( {
		defaults: {
			title: ''
		},
		urlRoot : '/',

		url : function () {
			return this.urlRoot + 'lists';
		},

		initialize : function () {
			this.fetch()
		},



		editListTitleInDB : function () {
			var self = this;
			$.ajax( {
				type : 'POST',
				url  : 'edit-list',
				data : {
					id    : self.get( '_id' ),
					title : self.get( 'title' )
				}
			} );
		}

	} );
	return user_model;
} );
