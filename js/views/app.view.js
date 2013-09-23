define( [
	'backbone',
	'views/list.view'
], function ( Backbone, ListView ) {
	var app_view = Backbone.View.extend( {
		el: $( '.b_main_container' ),

		events: {
			'keypress .b-add-list-input': 'addListInputField'
		},

		initialize: function () {
			var self = this;
			self.listenTo( self.collection, 'add', self.addListFromServerResponse );
			self.collection.fetch( {remove: false} );

		},

		render: function () {
			return this;
		},

		addListFromServerResponse: function ( model ) {
			var self = this;
			var listView = new ListView( {
				model: model,
				parentView: self
			} );
			self.$el.append( listView.render().el );
			if ( model.isNew() ) {
				self.saveModelToServer( model );
			}
		},

		saveModelToServer: function ( model ) {
			model.save( null, {success: function ( model, res ) {
				model.set( 'id', res._id );
				model.set( '_id', res._id );
			}} )
		},

		addListInputField: function ( e ) {
			var title = $( e.target ).val(),
				self = this;
			if ( e.keyCode === 13 && title.length !== 0 ) {
				self.collection.add( {
					title: title
				} );
			}
		}

	} );
	return app_view;
} );
