var Mongo = require( 'mongodb' ),
	MongoClient = require( 'mongodb' ).MongoClient,
	BSON = Mongo.BSONPure,
	ObjectID = require( 'mongodb' ).ObjectID,
	remoteAdress = "mongodb://nodejitsu_dmfilipenko:6e92v5kn2dmeu06jruse5stclp@ds039267.mongolab.com:39267/nodejitsu_dmfilipenko_nodejitsudb3393854934";
//remoteAdress = "mongodb://root:pass@paulo.mongohq.com:10031/RubyGarage";

exports.getLists = function ( req, res ) {
	MongoClient.connect( remoteAdress, function ( err, db ) {
		if ( err ) throw err;
		db.collection( 'list', function ( err, collection ) {
			collection.find().sort( {_id: 1, 'todos.position': -1} ).toArray( function ( err, items ) {
				res.json( { data: items } );
			} );
		} );
	} );
};

exports.createLists = function ( req, res ) {
	var url = require( 'url' );
	var title = req.body.title;
	MongoClient.connect( remoteAdress, function ( err, db ) {
		if ( err ) throw err;
		db.collection( 'list', function ( err, collection ) {
			collection.insert( {title: title}, function ( err, el ) {
				el.forEach( function ( list ) {
					collection.find( {title: title, _id: list['_id'] } ).toArray( function ( err, items ) {
						res.json( { _id: items[0]['_id'] } )
					} )
				} );

			} );
		} )
	} );
};

exports.removeList = function ( req, res ) {
	var url = require( 'url' );
	var queryID = req.params.id;
	var objID = new ObjectID( queryID );
	MongoClient.connect( remoteAdress, function ( err, db ) {
		if ( err ) throw err;
		db.collection( 'list', function ( err, collection ) {
			collection.remove( { _id: objID }, function ( err, el ) {
				res.json( { data: 'Successful delete' } )
				console.log( el )
			} );
		} )
	} );
};

exports.editListTitle = function ( req, res ) {
	var url = require( 'url' );
	var queryID = req.body.id;
	var todos = req.body.todos;
	var objID = new ObjectID( queryID );
	var newTitle = req.body.title
	MongoClient.connect( remoteAdress, function ( err, db ) {
		if ( err ) throw err;
		db.collection( 'list', function ( err, collection ) {
			if ( todos ) {
				collection.update( { _id: objID }, {
					$set: {
						title: newTitle,
						todos: todos
					}
				}, function ( err, el ) {
				} );
			} else {
				collection.update( { _id: objID }, {
					$set: {
						title: newTitle
					}
				}, function ( err, el ) {
				} );
			}

		} )
	} );
};

exports.addTask = function ( req, res ) {
	var listID = req.params.listid;
	var objID = new ObjectID( listID );
	var newTitle = req.body.title;
	var status = req.body.status;
	var position = parseInt( req.body.position, 10 );
	var idTask = req.params.taskid;
	var date = req.body.date;
	MongoClient.connect( remoteAdress, function ( err, db ) {
		if ( err ) throw err;
		db.collection( 'list', function ( err, collection ) {
			collection.update( { _id: objID }, {
				$push: {
					todos: {
						id: idTask,
						title: newTitle,
						status: status,
						position: position,
						date: date
					}
				}
			}, function ( err, el ) {
				res.json( {id: idTask} )
			} );
		} )
	} );
};

exports.editTask = function ( req, res ) {
	var url = require( 'url' );
	var list_id = new ObjectID( req.params.listid )
	var taskID = req.params.taskid;
	var position;
	var _tempARRAY = []
	MongoClient.connect( remoteAdress, function ( err, db ) {
		if ( err ) throw err;
		db.collection( 'list', function ( err, collection ) {
			if ( typeof req.body === 'object' ) {
				_tempARRAY.push( req.body )
			} else {
				_tempARRAY = req.body
			}
			_tempARRAY.forEach( function ( task ) {
				position = parseInt( task.position, 10 )
				collection.update( {
					'_id': list_id,
					'todos.id': taskID
				}, {
					$set: {
						'todos.$': {
							id: taskID,
							title: task.title,
							status: task.status,
							position: position,
							date: task.date
						}
					}
				}, function ( err, el ) {
					console.log( 'edit', err, el )
				} )
			} );

		} )
	} );
};

exports.deleteTask = function ( req, res ) {
	var url = require( 'url' );
	var todo_id = req.params.taskid;
	var list_id = new ObjectID( req.params.listid );
	MongoClient.connect( remoteAdress, function ( err, db ) {
		if ( err ) throw err;
		db.collection( 'list', function ( err, collection ) {
			collection.update( {'_id': list_id, 'todos.id': todo_id}, { $pull: { 'todos': {id: todo_id }  } }, function ( err, el ) {
			} );
		} )
	} );
};
