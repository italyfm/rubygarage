define( [
	'backbone',
	'text!/templates/todo.html',
	'jquery-ui'
], function ( Backbone, TodoTemplate ) {
	var todo_view = Backbone.View.extend( {
			className : 'b_one_todo',
			templates : {
				todo : TodoTemplate
			},
			css       : {
				done_task : 'b-task-is-done'
			},
			selectors : {
				form       : '.editTodoItem',
				datepicker : '.b-data-picker-input'
			},
			events    : {
				'keypress .b_todo_input_form'   : 'editTaskOnEnter',
				'click .b_one_todo_remove'      : 'removeTask',
				'click .b_one_todo_check input' : 'changeDoneStatus',
				'click .b_one_todo_edit'        : 'editTask'
			},

			initialize : function () {
				var self = this;
				var todoOptions = this.model.toJSON();
				self.render( todoOptions );
				self.$el.on( 'element:position', function () {
					self.changePosition();
				} );
				self.$el.on( 'change:deadline', function () {
					self.changeDeadline();
				} );
				self.model.on( 'change', function ( model ) {
					if ( model.hasChanged( 'status' ) || model.hasChanged( 'title' ) || model.hasChanged( 'date' ) ) {
						self.model.save();
					}
				} );
			},

			render : function ( todoData ) {
				var self = this;
				var todoTemplate = _.template( this.templates.todo, {todo : todoData} );
				if ( todoData.status !== 'inprogress' ) {
					this.$el.addClass( self.css.done_task );
				}
				this.$el.append( todoTemplate );
				this.addIdTodo( this.$el, todoData.id ).addPositionTodo( this.$el, todoData.position );
				this.addDatePicker();
				this.addDeadlineClass( todoData.date );
				return this;
			},

			addIdTodo : function ( el, id ) {
				el.attr( 'data-task-id', id )
				return this;
			},

			addPositionTodo : function ( el, position ) {
				el.attr( 'data-task-position', position )
				return this;
			},

			removeTask : function () {
				var self = this;
				self.model.destroy();
				self.remove();
				self.model.off();
				self.undelegateEvents();
			},

			editTask : function () {
				var self = this,
					$el = this.$el.find( 'input[type="text"]' );
				self.changeDisableField( $el );
				self.model.set( 'title', $el.val() );
			},

			editTaskOnEnter : function ( e ) {
				var self = this;
				if ( e.keyCode == 13 ) {
					self.editTask();
					return false;
				}
			},

			addDatePicker : function () {
				var self = this;
				this.$el.find( this.selectors.datepicker ).datepicker( { dateFormat : "yy/mm/dd" } )
				this.$el.find( this.selectors.datepicker ).on( 'change', function ( e ) {
					self.$el.trigger( 'change:deadline' );
				} )
			},

			changeDisableField : function ( $el ) {
				if ( $el.prop( 'disabled' ) ) {
					$el.prop( 'disabled', false );
				} else {
					$el.prop( 'disabled', true );
				}
			},

			changePosition : function () {
				var currPosition = this.$el.attr( 'data-task-position' );
				this.model.set( 'position', parseInt( currPosition, 10 ) );
			},

			addDeadlineClass : function ( taskDate ) {
				var selectDateTimeStamp = new Date( taskDate ).getTime();
				var currTimeStamp = new Date( new Date().getFullYear() + '/' + (new Date().getMonth() + 1)  + '/' + new Date().getDate() ).getTime() ; //shit code:((
				if ( selectDateTimeStamp < currTimeStamp ) {
					this.$el.addClass( 'deadline-end' );
				} else {
					this.$el.removeClass( 'deadline-end' )
				}
			},

			changeDeadline : function () {
				var deadLine = this.$el.find( this.selectors.datepicker ).val();
				this.model.set( 'date', deadLine );
				this.addDeadlineClass( deadLine )
			},

			changeDoneStatus : function () {
				var self = this;
				self.$el.toggleClass( self.css.done_task );
				if ( self.model.get('status') !== 'done' ){
					self.model.set( 'status', 'done' );
				} else{
					self.model.set( 'status', 'inprogress' );
				}

			}

		} )
		;
	return todo_view;
} )
;
