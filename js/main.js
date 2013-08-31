require.config( {
	baseUrl : 'js',
	paths   : {
		jquery      : '_libs/jquery-2.0.3.min',
		underscore  : '_libs/underscore-min',
		backbone    : '_libs/backbone',
		'jquery-ui' : '_libs/jquery-ui-1.10.3.custom.min'
	},
	shim    : {
		'backbone' : {
			deps    : ['underscore', 'jquery'],
			exports : 'Backbone'
		},
		underscore : {
			exports : '_'
		}
	}
} );
window.TodoApp = {
	current : {
		controller : []
	},
	view    : {},
	model   : {}
};

require( [
	'backbone',
	'router',
	'views/app.view',
	'collections/lists.collection'
],
	function ( Backbone, Router, AppView, ListsCollection ) {
		TodoApp.view = new AppView( {
			collection : new ListsCollection()
		} );
		Router.initialize();
	} );
