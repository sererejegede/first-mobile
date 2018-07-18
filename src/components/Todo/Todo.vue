<template src="./Todo.html"></template>

<script>
  export default {
    name: 'Todo',
    data() {
      return {
        showForm: false,
        todos: [],
        completedTodos: ['Done'],
        todo: "",
        search: "",
      }
    },
    computed: {
      activeTodos () {
        if (!this.search) {
          return this.todos
        }
        return this.todos.filter(todo => {
          return todo.toLowerCase().includes(this.search.toLowerCase())
        })
      }
    },
    created () {
      this.$store.dispatch('fetch').then(result => {
        console.log('From Todo component', result);
        this.todos = this.$store.state.collections;
      });
    },
    methods: {
      refresh () {
        this.todos = this.$store.state.collections;
      },
      addTodo() {
        this.todos.unshift(this.todo);
        this.$store.dispatch('insert', this.todo).then(() => {
          this.todos = this.$store.state.collections;
        });
      },
      options(args) {
        const itemIndex = this.todos.indexOf(args);
        action('What do you want to do with this To Do?', 'Cancel', ['Mark complete', 'Delete'])
            .then(result => {
              switch (result) {
                case 'Mark complete':
                  this.markComplete(args, itemIndex);
                  break;
                case 'Delete':
                  this.deleteTodo(this.todos, itemIndex);
                  break;
                case 'Cancel' || undefined: // Dismisses the dialog.
                  break;
              }
            })
      },
      markComplete(todo, index) {
        this.completedTodos.unshift(todo);
        this.todos.splice(index, 1);
      },
      markIncomplete(todo, index) {
        this.todos.unshift(todo);
        this.completedTodos.splice(index, 1);
      },
      deleteTodo(todos, index) {
        todos.splice(index, 1)
      },
      reversal (args) {
        const itemIndex = this.completedTodos.indexOf(args);
        action('What do you want to do with this To Do?', 'Cancel', ['Mark as incomplete', 'Delete'])
            .then(result => {
              switch (result) {
                case 'Mark as incomplete':
                  this.markIncomplete(args, itemIndex);
                  break;
                case 'Delete':
                  this.deleteTodo(this.completedTodos, itemIndex);
                  break;
                case 'Cancel' || undefined: // Dismisses the dialog.
                  break;
              }
            })
      }
    }
  }
</script>

<style scoped>

</style>