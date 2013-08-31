define( [
	'backbone'

], function ( Backbone ) {
	var AppRouter = Backbone.Router.extend( {
		routes : {
			'projects' : 'showProjects',
			'todo'     : 'showTodo',
			'*actions' : 'defaultAction'
		}
	} );

	var initialize = function () {
		var app_router = new AppRouter;

		app_router.on( 'route', function ( router, route, params ) {
		} );

		app_router.on( 'route:showTodo', function () {

		} );

		Backbone.history.start();
	};
	return {
		initialize : initialize
	}
} );
