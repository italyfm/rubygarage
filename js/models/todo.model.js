define( [
	'backbone'
], function ( Backbone ) {
	var todo_model = Backbone.Model.extend( {
		defaults:{
			status   : 'inprogress',
			newTask  : true,
			date     :  new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate() //not optimized whatever
		},
		url : function () {
			var task_id = (this.get( '_id' )) ? this.get( '_id' ) : this.get( 'id' );
			return '/list/' + this.get( 'list_id' ) + '/task/' + task_id
		}
	} );
	return todo_model;
} );
