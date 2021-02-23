<template>
	<view>
		<section class="todoapp">
			<header class="header">
				<h1>todos</h1>
				<input type="text" class="new-todo" focus autocomplete="off" placeholder="What needs to be done?" v-model="newTodo"
				 @keydown.enter="addTodo" />
			</header>
			<section class="main uni-scrollbar" v-show="todos.length" v-cloak>
				<checkbox id="toggle-all" class="toggle-all" :class="{'toggle-all__checked': allDone}" :checked="allDone" />
				<label for="toggle-all" @click="allDone = !allDone"></label>
				<ul class="todo-list">
					<li v-for="todo in filteredTodos" class="todo" :key="todo.id" :class="{ completed: todo.completed, editing: todo == editedTodo }">
						<div class="view">
							<checkbox class="toggle" :class="{'toggle__checked': todo.completed}" :checked="todo.completed" />
							<label @dblclick="editTodo(todo)" @click="todo.completed = !todo.completed">
								<div style="width: 100%;" @click.stop>{{ todo.title }}</div>
							</label>
							<button class="destroy" @click="removeTodo(todo)">✘</button>
						</div>
						<input class="edit" v-model="todo.title" v-todo-focus="todo === editedTodo" @blur="doneEdit(todo)" @keydown.enter="doneEdit(todo)"
						 @keydown.esc="cancelEdit(todo)" />
					</li>
				</ul>
			</section>
			<footer class="footer" v-show="todos.length" v-cloak>
				<span class="todo-count">
					<strong>{{ remaining }}</strong> <span style="margin-left: 4px;">{{ remaining | pluralize }} left</span>
				</span>
				<ul class="filters">
					<li @click="visibility = 'all'">
						<span :class="{ selected: visibility == 'all' }">All</span>
					</li>
					<li @click="visibility = 'active'">
						<span :class="{ selected: visibility == 'active' }">Active</span>
					</li>
					<li @click="visibility = 'completed'">
						<span :class="{ selected: visibility == 'completed' }">Completed</span>
					</li>
				</ul>
				<button class="clear-completed" @click="removeCompleted" v-show="todos.length > remaining">
					Clear completed
				</button>
			</footer>
		</section>
		<footer class="info">
			<p>Double-click to edit a todo</p>
			<p>Written by <a href="http://evanyou.me">Evan You</a></p>
			<p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
		</footer>
	</view>
</template>

<script>
	// Full spec-compliant TodoMVC with localStorage persistence
	// and hash-based routing in ~120 effective lines of JavaScript.

	// localStorage persistence
	const STORAGE_KEY = "todos-vuejs-2.0";
	const todoStorage = {
		fetch: function() {
			const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
			todos.forEach(function(todo, index) {
				todo.id = index;
			});
			todoStorage.uid = todos.length;
			return todos;
		},
		save: function(todos) {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
		}
	};

	// visibility filters
	const filters = {
		all: function(todos) {
			return todos;
		},
		active: function(todos) {
			return todos.filter(function(todo) {
				return !todo.completed;
			});
		},
		completed: function(todos) {
			return todos.filter(function(todo) {
				return todo.completed;
			});
		}
	}
	export default {
		name: 'V587Todo',
		// app initial state
		data() {
			return {
				todos: todoStorage.fetch(),
				newTodo: "",
				editedTodo: null,
				visibility: "all"
			}
		},
		// watch todos change for localStorage persistence
		watch: {
			todos: {
				handler: function(todos) {
					todoStorage.save(todos);
				},
				deep: true
			}
		},
		// visibility filters
		filters: {
			pluralize: function(n) {
				return n === 1 ? "item" : "items";
			}
		},
		// computed properties
		// http://vuejs.org/guide/computed.html
		computed: {
			filteredTodos: function() {
				return filters[this.visibility](this.todos);
			},
			remaining: function() {
				return filters.active(this.todos).length;
			},
			allDone: {
				get: function() {
					return this.remaining === 0;
				},
				set: function(value) {
					this.todos.forEach(function(todo) {
						todo.completed = value;
					});
				}
			}
		},
		// methods that implement data logic.
		// note there's no DOM manipulation here at all.
		methods: {
			addTodo: function() {
				let value = this.newTodo && this.newTodo.trim();
				if (!value) {
					return;
				}
				this.todos.push({
					id: todoStorage.uid++,
					title: value,
					completed: false
				});
				this.newTodo = "";
			},

			removeTodo: function(todo) {
				this.todos.splice(this.todos.indexOf(todo), 1);
			},

			editTodo: function(todo) {
				this.beforeEditCache = todo.title;
				this.editedTodo = todo;
			},

			doneEdit: function(todo) {
				console.log('doneEdit::', todo);
				if (!this.editedTodo) {
					return;
				}
				this.editedTodo = null;
				todo.title = todo.title.trim();
				if (!todo.title) {
					this.removeTodo(todo);
				}
			},

			cancelEdit: function(todo) {
				this.editedTodo = null;
				todo.title = this.beforeEditCache;
			},

			removeCompleted: function() {
				this.todos = filters.active(this.todos);
			}
		},
		// a custom directive to wait for the DOM to be updated
		// before focusing on the input field.
		// http://vuejs.org/guide/custom-directive.html
		directives: {
			"todo-focus": function(el, binding) {
				if (binding.value) {
					el.querySelector('input').focus()
				}
			}
		}

	}
</script>
<style scoped>
	[v-cloak] {
		display: none;
	}

	button {
		margin: 0;
		padding: 0;
		border: 0;
		background: none;
		font-size: 100%;
		vertical-align: baseline;
		font-family: inherit;
		font-weight: inherit;
		color: inherit;
		-webkit-appearance: none;
		appearance: none;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	:focus {
		outline: 0;
	}

	.hidden {
		display: none;
	}

	.todoapp {
		background: #fff;
		margin: 130px 0 40px 0;
		position: relative;
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
			0 25px 50px 0 rgba(0, 0, 0, 0.1);
	}

	.todoapp input::-webkit-input-placeholder {
		font-style: italic;
		font-weight: 300;
		color: #e6e6e6;
	}

	.todoapp input::-moz-placeholder {
		font-style: italic;
		font-weight: 300;
		color: #e6e6e6;
	}

	.todoapp input::input-placeholder {
		font-style: italic;
		font-weight: 300;
		color: #e6e6e6;
	}

	.todoapp h1 {
		position: absolute;
		top: -155px;
		width: 100%;
		font-size: 100px;
		font-weight: 100;
		text-align: center;
		color: rgba(175, 47, 47, 0.15);
		-webkit-text-rendering: optimizeLegibility;
		-moz-text-rendering: optimizeLegibility;
		text-rendering: optimizeLegibility;
	}

	.new-todo,
	.edit {
		position: relative;
		margin: 0;
		width: 100%;
		font-size: 24px;
		font-family: inherit;
		font-weight: inherit;
		line-height: 1.2;
		border: 0;
		color: inherit;
		border: 1px solid #999;
		box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
		box-sizing: border-box;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.new-todo {
		padding: 8px 16px 8px 60px;
		border: none;
		height: 50px;
		font-size: 30px;
		background: rgba(0, 0, 0, 0.003);
		box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
	}

	.main {
		position: relative;
		z-index: 2;
		border-top: 1px solid #e6e6e6;
		max-height: 300px;
	}

	.toggle-all {
		width: 1px;
		height: 1px;
		border: none;
		/* Mobile Safari */
		opacity: 0;
		position: absolute;
		right: 100%;
		bottom: 100%;
	}

	.toggle-all+label {
		width: 60px;
		height: 34px;
		font-size: 0;
		position: fixed;
		top: 136px;
		left: -6px;
		-webkit-transform: rotate(90deg);
		transform: rotate(90deg);
	}

	.toggle-all+label:before {
		content: '❯';
		font-size: 22px;
		color: #e6e6e6;
		padding: 10px 27px 10px 27px;
	}

	.toggle-all__checked+label:before {
		color: #737373;
	}

	.todo-list {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.todo-list .view {
		height: 40px;
		line-height: 40px;
	}

	.todo-list li {
		position: relative;
		font-size: 24px;
		border-bottom: 1px solid #ededed;
	}

	.todo-list li:last-child {
		border-bottom: none;
	}

	.todo-list li.editing {
		border-bottom: none;
		padding: 0;
	}

	.todo-list li.editing .edit {
		display: block;
		width: calc(100% - 43px);
		padding: 4px 16px;
		margin: 0 0 0 43px;
		height: 40px;
		line-height: 40px;
	}

	.todo-list li.editing .view {
		display: none;
	}

	.todo-list li .toggle {
		text-align: center;
		width: 40px;
		/* auto, since non-WebKit browsers doesn't support input styling */
		height: auto;
		position: absolute;
		top: 0;
		bottom: 0;
		margin: auto 0;
		border: none;
		/* Mobile Safari */
		-webkit-appearance: none;
		appearance: none;
	}

	.todo-list li .toggle {
		opacity: 0;
	}


	.todo-list li .toggle+label {
		/*
			Firefox requires `#` to be escaped - https://bugzilla.mozilla.org/show_bug.cgi?id=922433
			IE and Edge requires *everything* to be escaped to render, so we do that instead of just the `#` - https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7157459/
		*/
		background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');
		background-repeat: no-repeat;
		background-position: center left;
	}

	.todo-list li .toggle__checked+label {
		background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E');
	}

	.todo-list li label {
		word-break: break-all;
		padding: 0 16px 0 60px;
		display: block;
		transition: color 0.4s;
	}

	.todo-list li.completed label {
		color: #d9d9d9;
		text-decoration: line-through;
	}

	.todo-list li .destroy {
		display: none;
		position: absolute;
		top: 0;
		right: 10px;
		bottom: 0;
		width: 26px;
		height: 26px;
		margin: auto 0;
		font-size: 12px;
		color: #cc9a9a;
		transition: color 0.2s ease-out;
	}

	.todo-list li .destroy:hover {
		color: #af5b5e;
	}


	.todo-list li:hover .destroy {
		display: block;
	}

	.todo-list li .edit {
		display: none;
	}

	.todo-list li.editing:last-child {
		margin-bottom: -1px;
	}

	.footer {
		color: #777;
		padding: 10px 15px;
		height: 20px;
		text-align: center;
		border-top: 1px solid #e6e6e6;
	}

	.footer:before {
		content: '';
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 50px;
		overflow: hidden;
		box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
			0 8px 0 -3px #f6f6f6,
			0 9px 1px -3px rgba(0, 0, 0, 0.2),
			0 16px 0 -6px #f6f6f6,
			0 17px 2px -6px rgba(0, 0, 0, 0.2);
	}

	.todo-count {
		float: left;
		text-align: left;
	}

	.todo-count strong {
		font-weight: 300;
	}

	.filters {
		margin: 0;
		padding: 0;
		list-style: none;
		position: absolute;
		right: 0;
		left: 0;
	}

	.filters li {
		display: inline;
	}

	.filters li span {
		color: inherit;
		margin: 3px;
		padding: 3px 7px;
		text-decoration: none;
		border: 1px solid transparent;
		border-radius: 3px;
	}

	.filters li span:hover {
		border-color: rgba(175, 47, 47, 0.1);
	}

	.filters li span.selected {
		border-color: rgba(175, 47, 47, 0.2);
	}

	.clear-completed,
	html .clear-completed:active {
		float: right;
		position: relative;
		line-height: 20px;
		text-decoration: none;
		cursor: pointer;
	}

	.clear-completed:hover {
		text-decoration: underline;
	}

	.info {
		margin: 65px auto 0;
		color: #bfbfbf;
		font-size: 10px;
		text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
		text-align: center;
	}

	.info p {
		line-height: 1;
	}

	.info a {
		color: inherit;
		text-decoration: none;
		font-weight: 400;
	}

	.info a:hover {
		text-decoration: underline;
	}

	/*
		Hack to remove background from Mobile Safari.
		Can't use it globally since it destroys checkboxes in Firefox
	*/
	@media screen and (-webkit-min-device-pixel-ratio:0) {

		.toggle-all,
		.todo-list li .toggle {
			background: none;
		}

		.todo-list li .toggle {
			height: 40px;
			margin-left: -52px;
		}
	}

	@media (max-width: 430px) {
		.footer {
			height: 50px;
		}

		.filters {
			bottom: 10px;
		}
	}
	
	.uni-scrollbar {
		overflow: overlay;
	}
	
	/*滚动条样式*/
	.uni-scrollbar::-webkit-scrollbar {
		width: 6px;
		height: 6px;
	}
	
	.uni-scrollbar::-webkit-scrollbar-corner {
		background-color: transparent;
	}
	
	.uni-scrollbar:hover::-webkit-scrollbar-thumb {
		border-radius: 10px;
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		background-color: transparent;
		border: 1px solid transparent;
	}
	
	.uni-scrollbar::-webkit-scrollbar-thumb:hover {
		background-color: rgb(167, 167, 171);
		border-color: #cccccc;
		border: 1px solid rgb(207, 207, 212);
	}
	
	.uni-scrollbar::-webkit-scrollbar-track {
		background-color: transparent;
	}
</style>
