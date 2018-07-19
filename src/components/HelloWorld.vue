<template>
  <page>
    <stack-layout class="home-panel">
      <button class="m-30" width="50%" text="Open Todo App" @tap="openTodo" backgroundColor="orange" />
      <Image src="~/images/NativeScript-Vue.png" stretch="none" />
    </stack-layout>
  </page>
</template>

<script>
  import Todo from './Todo/Todo.vue'
  export default {
    name: 'Hello World',
    data () {
      return {

      }
    },
    methods: {
      openTodo () {
        this.$navigateTo(Todo);
      }
    }
  }
</script>

<style scoped>
  .hello-world {
    margin: 20;
  }

  Label {
    color: red;
  }
</style>
