<template src="./Todo.html"></template>

<script>
  import moment from 'moment';

  export default {
    name: 'Todo',
    data() {
      return {
        loader: {
          loading: false
        },
        showForm: false,
        todo: "",
        search: "",
        la: {
          circle: this.parseFont('f18a'),
          check: this.parseFont('f17b')
        } 
      }
    },
    computed: {
      activeTodos () {
        let todos = this.$store.getters.incompleteTodos;
        if (!this.search) {
          return todos;
        } else {
          return todos.filter(todo => {
            return todo.name.toLowerCase().includes(this.search.toLowerCase())
        })
        }
      },
      completedTodos () {
        if (!this.search) {
          return this.$store.getters.completedTodos;
        }
        return this.$store.getters.completedTodos.filter(todo => {
          return todo.name.toLowerCase().includes(this.search.toLowerCase())
        })
      }
    },
    created () {
      this.refresh();
    },
    methods: {
      refresh () {
        this.$store.dispatch('fetch').then(result => {
          // this.todos = this.$store.getters.incompleteTodos;
          console.log('Incomplete Todos from getters', this.$store.getters.incompleteTodos);
        });
      },
      addTodo() {
        const data = {
          name: this.todo,
          created_at: Date.now()
        };
        this.$store.dispatch('insert', data).then(() => {
        this.refresh();
        });
        this.todo = '';
      },
      options(args) {
        action(args.name, 'Cancel', ['Delete'])
            .then(result => {
              switch (result) {
                case 'Mark complete':
                  this.markComplete(args);
                  break;
                case 'Delete':
                  this.deleteTodo(args);
                  break;
                case 'Cancel' || undefined: // Dismisses the dialog.
                  break;
              }
            })
      },
      reversal (args) {
        action(args.name, 'Cancel', ['Delete'])
            .then(result => {
              switch (result) {
                case 'Mark as incomplete':
                  this.markIncomplete(args);
                  break;
                case 'Delete':
                  this.deleteTodo(args);
                  break;
                case 'Cancel' || undefined: // Dismisses the dialog.
                  break;
              }
            })
      },
      markComplete(todo) {
        todo['action'] = 1;
        todo['completed_at'] = Date.now();
        this.$store.dispatch('update', todo);
        this.refresh();
      },
      markIncomplete(todo) {
        todo['action'] = 0;
        todo['completed_at'] = null;
        this.$store.dispatch('update', todo);
        this.refresh();
      },
      deleteTodo(todo) {
        console.log(todo);
        this.$store.dispatch('deleteRecord', todo);
        this.refresh();
      },
      parseFont(code) {
        return String.fromCharCode(parseInt(code, 16));
      }
    }
  }
</script>

<style scoped>
  .icon {
    font-size: 30;
  }
  .icomoon {
    font-family: 'icomoon';
  }
  .line-awesome {
    font-family: 'line-awesome';
  }
</style>