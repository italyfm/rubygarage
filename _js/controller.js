var todoApplication = angular.module( 'todoApplication', [] );
todoApplication.controller( 'ListsTodoController', ['$scope', '$location', '$http' , function ($scope, $location, $http){
	$http.get( '/todolist.json' ).success( function ( data ){
		$scope.todos = data;
	} );
	console.log( $scope );
	//$scope.editTodo = true;

	//	$scope.removeOneItem = function ( elem ){
	//		var count = 0;
	//		$scope.todos.forEach( function ( el ){
	//			count += 1;
	//			if ( el == elem ) {
	//				$scope.todos.splice( count - 1, 1 );
	//				//console.log('we find it at position count', count );
	//			}
	//		} );
	//	};

	//	var todoItemSize = function ( object ){
	//		var size = 0, key;
	//		for ( key in object ) {
	//			if ( object.hasOwnProperty( key ) ) size++;
	//		}
	//		return size;
	//	};

	//	$scope.addItem = function ( todo ){
	//		var size = todoItemSize( todo.items );
	//	};

	//	$scope.checkDoneTodo = function ( item ){
	//		console.log( item )
	//	};
	//
	//	$scope.doneEditing = function ( $scope ){
	//		$scope.editTodo = $scope.editTodo ? false : true;
	//		console.log( $scope.editTodo );
	//		console.log( $scope )
	//	};
	//
	//	$scope.addTodoList = function ( lastTodo ){
	//		console.log( lastTodo );
	//		console.log( angular.toJson( items ) )
	//	}
}] );
function ListController( $scope ){
	console.log( $scope );
}

function ItemController( $scope, TodoController ){

	$scope.variable = "asd";
	console.log( TodoController.editTodo )

}

