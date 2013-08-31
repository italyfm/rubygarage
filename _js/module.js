angular.module( 'todo', [] ).
	directive( 'blur', function ( $document ) {
		return function ( scope, element, attr ) {
			if ( attr.disabled ) {
				element[0].blur()
			}
			scope.$watch(attr.ngDisabled, function(){
				element[0].blur()
			});
		}
	} ).directive('repeattodo', function( $document ){
	return function( scope, element, attr){
		console.log( 'start' );
		console.log( scope, element, attr );
		console.log( 'end' );
	}
})