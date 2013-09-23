define( [
	'backbone',
	'models/list.model'
], function ( Backbone, ListModel ) {
	var lists_collection = Backbone.Collection.extend( {
		model: ListModel,
		url: '/list',
		parse: function ( response ) {
			var self = this;
			var modelData = []
			if ( _.isArray( response.data ) || _.isArray( response ) ) {
				//add to all list param _id which equal _id of
				response.data.forEach( function ( list ) {
					list.id = list._id
					modelData.push( list )
				} );
				modelData = response.data;
				modelData.id = response.data._id;
				self.add( modelData );
			}
		}
	} );
	return lists_collection;
} );
