<template>
  <Page xlmn="http://schemas.nativescript.org/tns.xsd" class="right-gradient">
    <FlexboxLayout flexDirection="row" justifyContent="center" alignItems="center">
      <StackLayout class="home-panel">
        <Button class="m-30" width="50%" text="Open Todo App" @tap="showImage = !showImage" backgroundColor="orange" />
        <Image horizontalAlignment="center" v-if="showImage" src="~/images/NativeScript-Vue.png" stretch="none" />
      </StackLayout>
    </FlexboxLayout>

  </Page>
</template>

<script>
  import Todo from './Todo/Todo.vue'
  export default {
    name: 'Hello-World',
    data () {
      return {
        showImage: true
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

  .right-gradient {
    background: linear-gradient(to right, orangered, green, lightblue);
  }
</style>
