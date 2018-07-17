<template src="./Todo.html"></template>

<script>
  export default {
    name: 'Todo',
    data() {
      return {
        showForm: false,
        todos: ['Make coffee', 'Sing a song', 'Read some books', 'Sleep'],
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
    methods: {

        // this.todos.forEach(todo => {
        //   console.log(todo.toLowerCase().search(this.search.toLowerCase()))
        //   if (todo.search(this.search) > -1) {
        //
        //   }
        // })

      onItemTap: function (args) {
        console.log('Item with index: ' + args.index + ' tapped');
      },
      addTodo() {
        this.todos.unshift(this.todo)
        this.todo = ''
      },
      options(args) {
        //alert('Long press')
        const itemIndex = this.todos.indexOf(args);
        console.log(itemIndex);
        console.log(args);
        action('What do you want to do with this To Do?', 'Cancel', ['Mark complete', 'Delete'])
            .then(result => {
              switch (result) {
                case 'Mark complete':
                  this.completedTodos.unshift(args); // Places the tapped active task at the top of the completed tasks.
                  this.todos.splice(itemIndex, 1); // Removes the tapped active task.
                  break;
                case 'Delete':
                  this.todos.splice(itemIndex, 1); // Removes the tapped active task.
                  break;
                case 'Cancel' || undefined: // Dismisses the dialog.
                  break;
              }
            })
      },
      reversal (args) {
        const itemIndex = this.completedTodos.indexOf(args);
        console.log(itemIndex);
        console.log(args);
        action('What do you want to do with this To Do?', 'Cancel', ['Mark as incomplete', 'Delete'])
            .then(result => {
              switch (result) {
                case 'Mark as incomplete':
                  this.todos.unshift(args); // Places the tapped active task at the top of the completed tasks.
                  this.completedTodos.splice(itemIndex, 1); // Removes the tapped active task.
                  break;
                case 'Delete':
                  this.completedTodos.splice(itemIndex, 1); // Removes the tapped active task.
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