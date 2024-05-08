<template>
  <div class="main-container">
    <TodoForm v-on:add="addTodo"></TodoForm>
    <TodoList v-bind:todos="todos" v-on:delete="deleteTodo"></TodoList>
    <!-- <DetailModal v-bind:todos="todos"></DetailModal> -->
  </div>
</template>

<script>
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
//import DetailModal from './components/DetailModal'

let id = 0;
const STORAGE_KEY = 'todos-app';

export default {
  data () {
    return {
      todos: []
    }
  },
  created: function(){
    this.todos = this.todoStorageFetch();
  },
  watch: {
    todos: {
      handler: function(todos) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
      },
      deep: true
    }
  },
  components: {
    TodoForm,
    TodoList,
    //DetailModal
  },
  methods: {
    addTodo(newTask) {
      id = id + 1;
      this.todos.push({
        id: id,
        task: newTask.newTodo,
        isDone: false,
        priority: newTask.priority,
        deadline: newTask.deadline,
        memo: newTask.memo,
        category: newTask.category
      });
    },
    deleteTodo(todo) {
      var index = this.todos.indexOf(todo);
      // <配列>.splice(始まるのインデックス, 削除する要素数)
      this.todos.splice(index, 1);
    },
    todoStorageFetch() {
      var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      todos.forEach(function(todo, index) {
        todo.id = index;
      });
      return todos;
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New&display=swap');

#app {
  font-family: "Zen Kaku Gothic New", sans-serif;
  font-weight: 700;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0 auto;
}
</style>