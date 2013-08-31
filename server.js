/**
 * Module dependencies.
 */

var express = require( 'express' );
var http = require( 'http' );
var path = require( 'path' );
var fs = require( 'fs' );
//var MongoClient = require( 'mongodb' ).MongoClient;
var getDataDB = require( './server/controllers/db' );
// Connect to the db

//MongoClient.on("close", function(error){
//	console.log('db close')
//});
var app = express();

app.use( express.logger( 'dev' ) );
app.use( express.bodyParser() );
app.set( 'views', __dirname + '/' );

//app.get('/', function(req, res){
//	res.render('/views/index.html');
//});
app.use( '/js', express.static( 'js' ) );
app.use( '/templates', express.static( 'templates' ) );
app.use( '/css', express.static( 'css' ) );
app.use( '/img', express.static( 'img' ) );
/**
 * List server Interaction
 */
app.get( '/list', function ( req, res ) {
	getDataDB.getLists( req, res );
} );
app.post( '/list', function ( req, res ) {
	getDataDB.createLists( req, res );
} );
app.delete( '/list/:id', function ( req, res ) {
	getDataDB.removeList( req, res );
} );
app.put( '/list', function ( req, res ) {
	getDataDB.editListTitle( req, res );
} );



/**
 * Task server interaction
 */

app.post( '/list/:listid/task/:taskid', function ( req, res ) {
	getDataDB.addTask( req, res );
} );
app.put( '/list/:listid/task/:taskid', function ( req, res ) {
	getDataDB.editTask( req, res );
} );
app.delete( '/list/:listid/task/:taskid', function ( req, res ) {
	getDataDB.deleteTask( req, res );
} );

app.get( '/', function ( req, res ) {
	res.sendfile( 'index.html' );
} );
app.listen( 3001 );
console.log( 'Listening on port 3001' );