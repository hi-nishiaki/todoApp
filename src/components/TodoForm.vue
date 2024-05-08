<template>
  <div class="sidebar-container">
    <h1>MY TODO</h1>
    <div class="form-group">
      <p>タスク</p>
      <input type="text" v-model="newTask.newTodo">

      <p>優先度</p>
      <fieldset class="priority">
        <label>
        <input type="radio" class="visually-hidden" name="priority" value="low" v-model="newTask.priority">
          低
        </label>
        <label>
          <input type="radio" class="visually-hidden" name="priority" value="medium" v-model="newTask.priority">
          中
        </label>
        <label>
          <input type="radio" class="visually-hidden" name="priority" value="high" v-model="newTask.priority">
          高
        </label>
      </fieldset>
      
      <p>カテゴリー</p>
      <select v-model="newTask.category">
        <option value="work">仕事</option>
        <option value="study">勉強</option>
        <option value="housework">家事</option>
        <option value="submission">提出物</option>
      </select>

      <p>期限</p>
      <input type="date" v-model="newTask.deadline">

      <p>メモ</p>
      <textarea name="memo" v-model="newTask.memo"></textarea><br />
      <button v-on:click="addTodo">追加</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      newTask: {
        newTodo: '',
        deadline: '',
        priority: '',
        memo: '',
        category: ''
      }
    }
  },
  emits: ['add'],
  methods: {
    addTodo() {
      // if (this.newTask.newTodo === '') {
      //   alert("タスクが入力されていません。");
      //   return;
      // }
      // this.$emit(イベント名, データ);
      // イベントの監視はv-on:clickで定義
      this.$emit('add', this.newTask);
      this.newTask = '';
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New&display=swap');

.zen-kaku-gothic-new-regular {
  font-family: "Zen Kaku Gothic New", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.sidebar-container {
  box-sizing: border-box;
  height: 100%;
  width: 30%;
  padding: 20px;
  position: fixed;
  overflow: auto;
  background: #fff;
  text-align: center;
}
.sidebar-container h1 {
  width: 100%;
  padding: 20px 0;
  color: #40b983;
}
.form-group p {
  width: 70%;
  margin: 0 auto;
  padding: 5px;
  text-align: left;
  font-size: 13px;
  color: #000;
}
input[type=text],input[type="date"] {
  margin: 5px auto;
  padding: 10px;
  width: 70%;
  border: 1px solid #40b983;
  border-radius: 8px;
}
textarea {
  width: 70%;
  padding: 10px;
  border: 1px solid #40b983;
  border-radius: 8px;
}
.priority {
  display: flex;
  flex-wrap: wrap;
  gap: .3em 2em;
  margin-left: 150px;
  border: none;
}
.priority label {
  display: flex;
  align-items: center;
  gap: 0 .5em;
  position: relative;
  cursor: pointer;
}
.priority label::before,
.priority label::after {
  border-radius: 50%;
  content: '';
}
.priority label::before {
  width: 18px;
  height: 18px;
  border: 2px solid #dee5eb;
  box-sizing: border-box;
}
.priority label::after {
  position: absolute;
  top: 50%;
  left: 9px;
  transform: translate(-50%, -50%);
  width: 9px;
  height: 9px;
  background-color: #dee5eb;
}
.priority label:has(:checked)::after {
  background-color: #2589d0;
  animation: anim-radio-2 .3s linear;
}
.visually-hidden {
  position: absolute;
  white-space: nowrap;
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  overflow: hidden;
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
}

select {
  width: 73%;
  margin: 5px auto;
  padding: 10px;
  border: 1px solid #40b983;
  border-radius: 8px;
}
button {
  width: 50%;
  border: 1px;
  border-radius: 8px;
  line-height: 30px;
  margin: 15px 15px;
  padding: .5em 2em;
  background: #40b983;
  color: #fff;
  cursor: pointer;
  font-size: 15px;
}
</style>
