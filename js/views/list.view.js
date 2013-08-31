define( [
	'backbone',
	'models/todo.model',
	'views/todo.view',
	'text!/templates/list.html',
	'collections/todos.collection'
], function ( Backbone, TodoModel, TodoView, ListTemplate, TodoCollection ) {
	var user_view = Backbone.View.extend( {
		template : _.template( ListTemplate ),

		className : 'b_one_todo_container',

		selectors : {
			list_container   : '.b_todo_list',
			text_field       : '.b_todo_add_task_field',
			title            : '.b_todo_header_title',
			one_task         : '.b_one_todo',
			edit_title_field : '.b_todo_header_title_edit_field',

		},

		events : {
			'click .b_todo_add_task_button'                  : 'addNewTask',
			'keypress .b_todo_add_task_field'                : 'addTaskOnEnter',
			'click .b_todo_header_action_button_edit'        : 'saveListTitleOnClick',
			'keypress .b_todo_header_title_edit_field input' : 'saveListTitleOnEnter',
			'click .b_todo_header_action_button_delete'      : 'removeList'
		},

		initialize : function () {
			var self = this;
			_.bindAll( self, 'render' );
			self.collection = new TodoCollection();
			var debounceSave = _.debounce( function () {
				self.model.save();
			}, 300 );

			self.collection.on( 'add', function ( todoModel ) {
				todoModel.set( 'list_id', self.model.get( '_id' ) );
				var oneTodo = new TodoView( {
					model : todoModel
				} );
				oneTodo.parentView = self;
				self.$el.find( self.selectors.list_container ).append( oneTodo.el );
				if ( todoModel.isNew() ) {
					todoModel.save( null, {success : function ( model, res ) {
						model.set( '_id', res.id );
						model.set( 'id', res.id );
					}} );
				}
			} );

			self.collection.on( 'change:position', function () {
				self.model.set( 'todos', self.collection.toJSON() );
				debounceSave();
			} );

			self.model.on( 'change:title', function ( model, title ) {
				self.changeListTitle( title );
				model.save();
			} );
		},

		render : function () {
			this.$el.html( this.template( this.model.toJSON() ) );
			this.makeSortableList();
			this.addTaskToCollection( this.model.get( 'todos' ) );
			return this;
		},


		makeSortableList : function () {
			var sortableContainer;
			sortableContainer = this.$el.find( this.selectors.list_container );
			this.enableSortableElements( sortableContainer );
		},

		enableSortableElements : function ( container ) {
			var self = this;
			container.sortable( {
				'cursor' : 'move',
				axis     : 'y',
				handle   : '.b_one_todo_change_position',
				stop     : function ( e, ui ) {
					self.$el.find( self.selectors.one_task ).each( function ( index ) {
						$( this ).attr( 'data-task-position', index );
						$( this ).trigger( 'element:position' )
					} );
				}
			} );
		},

		addTaskToCollection : function ( tasks ) {
			var self = this;
			if ( tasks ) {
				tasks.sort( function ( a, b ) {
					return a.position > b.position ? 1 : a.position < b.position ? -1 : 0;
				} );
			}
			self.collection.add( tasks );
		},

		addTaskOnEnter : function ( e ) {
			var self = this;
			if ( e.keyCode == 13 ) {
				self.addNewTask();
			}
		},

		addNewTask : function () {
			var self = this;
			var modelParam = {
				title    : self.getTaskValue(),
				position : self.collection.length,
				_id      : (((1 + Math.random()) * 0x10000) | 0).toString( 16 ).substring( 1 )

			};
			self.collection.add( modelParam, { validate : true } );
			self.clearInputFiled();
		},

		getTaskValue : function () {
			var self = this;
			return self.$el.find( self.selectors.text_field ).val()
		},

		clearInputFiled : function () {
			var self = this;
			self.$el.find( self.selectors.text_field ).val( '' );
		},

		makeEditableListTitle : function () {
			var $container = this.$el,
				$field = $container.find( this.selectors.edit_title_field ),
				$buttonSave = $container.find( '.b_todo_header_action_button_edit' );
			$field.toggleClass( 'hide_block' );
			$buttonSave.toggleClass( 'b_save_list_title' );
		},

		saveListTitle : function () {
			var $inputTitleField = this.$el.find( '.b_edit_title_field' ),
				newTitleValue = $inputTitleField.val();
			this.model.set( 'title', newTitleValue );
		},

		saveListTitleOnEnter : function ( e ) {
			if ( e.keyCode === 13 ) {
				this.makeEditableListTitle();
				this.saveListTitle();
			}
		},

		saveListTitleOnClick : function () {
			this.makeEditableListTitle();
			this.saveListTitle();
		},

		changeListTitle : function ( title ) {
			var $headerTitle = this.$el.find( this.selectors.title );
			$headerTitle.text( title );
		},

		removeList : function () {
			this.model.url += "/" + this.model.get( '_id' );
			this.model.destroy();
			this.model.off();
			this.undelegateEvents();
			this.remove();
		}

	} );
	return user_view;
} );
