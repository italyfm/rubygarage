define( [
	'backbone'

], function ( Backbone ) {
	var AppRouter = Backbone.Router.extend( {
		routes: {
			'projects': 'showProjects',
			'todo': 'showTodo',
			'*actions': 'defaultAction'
		}
	} );

	var initialize = function () {
		var app_router = new AppRouter;


		Backbone.history.start();
	};
	return {
		initialize: initialize
	}
} );
