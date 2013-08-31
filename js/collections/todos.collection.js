define( [
	'backbone',
	'models/todo.model'
], function ( Backbone, TodoModel ) {
	var todos_collection = Backbone.Collection.extend( {
		model      : TodoModel,

		comparator : function ( a, b ) {
			a = a.position;
			b = b.position;
			return a > b ? 1 : a < b ? -1 : 0;
		},
//		save: function( data ){
//			$.ajax({
//				type: 'PUT',
//				data: JSON.stringify(data),
//				contentType: 'application/json',
//				cache: false,
//				dataType: 'json',
//				url: '/list'
//			})
//		},
//		toJSON : function() {
//			return this.map(function(model){ return model.toJSON(); });
//		}
	} );
	return todos_collection;
} );
