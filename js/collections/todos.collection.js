define( [
	'backbone',
	'models/todo.model'
], function ( Backbone, TodoModel ) {
	var todos_collection = Backbone.Collection.extend( {
		model: TodoModel,

		comparator: function ( a, b ) {
			a = a.position;
			b = b.position;
			return a > b ? 1 : a < b ? -1 : 0;
		}
	} );
	return todos_collection;
} );
