<template>
  <div class="item-list">
    <div class="filter">
      <select name="filter-status" v-model="current">
        <option v-for="(label, index) in options" v-bind:key="index"
          v-bind:value="label.id">{{ label.label }}</option>
      </select>
      <select name="filter-date" v-model="currentDate">
        <option v-for="(label, index) in dateOptions" v-bind:key="index"
          v-bind:value="label.kind">{{ label.label }}</option>
      </select>
      <select name="filter-category" v-model="currentCategory">
        <option v-for="(label, index) in categoryOptions" v-bind:key="index"
          v-bind:value="label.kind">{{ label.label }}</option>
      </select>
    </div>
    
    <table>
      <thead>
        <tr>
          <th class="status">完了</th>
          <th colspan="3" class="task">タスク名</th>
          <th class="priority">優先度</th>
          <th class="category">カテゴリー</th>
          <th class="deadline">期限</th>
          <th class="edit">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="todo in computedTodos" v-bind:key="todo.id">
          <th>
            <input type="checkbox" v-model="todo.isDone" @change="changeStatus(todo)">
          </th>
          <td colspan="3">
            <span v-bind:class="{done: todo.isDone}">{{ todo.task }}</span>
          </td>
          <td>
            <span>{{ convertPriorityValue(todo.priority) }}</span>
          </td>
          <td>
            <span>{{ convertCategoryValue(todo.category) }}</span>
          </td>
          <td>
            <span>{{ moment(todo.deadline) }}</span>
          </td>
          <td class="edit">
            <button v-on:click="deleteTodo(todo)">削除</button>
            <div class="modal-window">
              <button @click="openModal(todo)">詳細</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <DetailModal @close="closeModal" v-if="modal" :todo="todo">
      <div class="modal-content">
        <p>タスク名</p>
        <span>{{ todo.task }}</span>

        <p>優先度</p>
        <fieldset class="modal-priority">
          <label>
          <input type="radio" class="visually-hidden" v-model="todo.priority" value="low">
            低
          </label>
          <label>
            <input type="radio" class="visually-hidden" v-model="todo.priority" value="medium">
            中
          </label>
          <label>
            <input type="radio" class="visually-hidden" v-model="todo.priority" value="high">
            高
          </label>
        </fieldset>

        <p>カテゴリー</p>
        <span>{{ convertCategoryValue(todo.category) }}</span>

        <p>期限</p>
        <input type="date" v-model="todo.deadline">

        <p>メモ</p>
        <textarea v-model="todo.memo"></textarea><br />

        <button class="close" @click="closeModal">閉じる</button>
      </div>
    </DetailModal>
  </div>
</template>
   
<script>
import moment from "moment"
import DetailModal from "./DetailModal"

moment.locale("ja")

export default {
  components: {
    DetailModal
  },
  data () {
    return {
      modal: false,
      todo: [],
      current: -1,
      currentDate: 'default',
      currentCategory: 'default',
      options: [
        { id: -1, label: 'すべて' },
        { id: 0,  label: '作業中' },
        { id: 1,  label: '完了' }
      ],
      dateOptions: [
        { kind: 'default', label: '' },
        { kind: 'desc', label: '日付が新しい順' },
        { kind: 'asc',  label: '日付が古い順' }
      ],
      categoryOptions: [
        { kind: 'default', label: '' },
        { kind: 'work',  label: '仕事' },
        { kind: 'study',  label: '勉強' },
        { kind: 'housework',  label: '家事' },
        { kind: 'submission',  label: '提出物' }
      ]
    }
  },
  props: [ // props: 親コンポーネントから子コンポーネントにデータを受け取ることができる
    'todos'
  ], 
  emits: [ // $emitを使うときはemitsでイベント名を宣言しておく必要がある
    'delete',
    'input'
  ],
  methods: {
    deleteTodo: function(todo) {
      this.$emit('delete', todo);
    },
    changeStatus: function(todo) {
      this.$emit('input', todo);
    },
    moment: function(date) {
      return moment(date).format("YYYY/MM/DD");
    },
    convertPriorityValue: function(value) {
      if (value === 'low') {
        return "低";
      } else if (value === 'medium') {
        return "中";
      } else if (value === 'high') {
        return "高";
      }
    },
    convertCategoryValue: function(value) {
      if (value === 'work') {
        return "仕事";
      } else if (value === 'study') {
        return "勉強";
      } else if (value === 'housework') {
        return "家事";
      } else if (value === 'submission') {
        return "提出物";
      }
    },
    openModal: function(todo) {
      this.modal = true;
      this.todo = todo;
    },
    closeModal() {
      this.modal = false;
    }
  },
  computed: {
    computedTodos: function() {
      if (this.current == 0 || this.current == 1) {
        return this.filterStatus;
      } else if (this.currentDate == 'asc' || this.currentDate == 'desc') {
        return this.filterDate;
      } else if (!(this.currentCategory == 'default')) {
        return this.filterCategory;
      }
      return this.todos;
    },
    filterStatus() {
      const result = this.todos.filter(function(el) {
                        const state = el.isDone ? 1 : 0;
                        return this.current === state
                     }, this)
      return result;
    },
    filterDate() {
      const result = this.todos.slice().sort((a,b) => {
        if (this.currentDate == 'asc') {
          return a.deadline > b.deadline ? 1 : -1;
        } else if (this.currentDate == 'desc') {
          return a.deadline < b.deadline ? 1 : -1;
        }
      });
      return result;
    },
    filterCategory() {
      const result = this.todos.filter(function(el) {
                        return this.currentCategory === el.category;
                      }, this)
      return result; 
    }
  }
} 
</script>

<style scoped>
.item-list {
  background: #fff;
  width: 60%;
  position: fixed;
  top: 12rem;
  right: 7rem;
  text-align: center;
  font-family: "Zen Kaku Gothic New", sans-serif;
  font-weight: 500;
  font-style: normal;
}
table {
  width: 80%;
  margin: 0 auto;
  border-collapse: collapse;
}
thead th {
  border-bottom: 2px solid #40b983; /*#d31c4a */
  color: #40b983;
}
th,
th {
  padding: 0 8px;
  line-height: 40px;
}
thead th.id {
  width: 50px;
}
thead th.state {
  width: 100px;
}
thead th.button {
  width: 60px;
}
tbody td.button, tbody td.state {
  text-align: center;
}
tbody tr td,
tbody tr th {
  border-bottom: 1px solid #ccc;
  transition: all 0.4s;
}
tbody tr.done td,
tbody tr.done th {
  background: #40b983;
  color: #bbb;
}
tbody tr:hover td,
tbody tr:hover th {
  background: #f4fbff;
}
button {
  border: none;
  border-radius: 20px;
  line-height: 24px;
  padding: 0 8px;
  background: #40b983;
  color: #fff;
  cursor: pointer;
}
span.done {
  text-decoration: line-through;
}

.filter {
  margin-left: 55%;
  margin-bottom: 20px;
}
.filter-status {
  margin: 10px;
}

.modal-content {
  top: 15rem;
}
.modal-content p {
  width: 70%;
  margin: 0 auto;
  padding: 5px;
  text-align: left;
  font-size: 13px;
  color: #000;
}

input[type="date"] {
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

.modal-priority {
  display: flex;
  flex-wrap: wrap;
  gap: .3em 2em;
  margin-left: 150px;
  border: none;
}
.modal-priority label {
  display: flex;
  align-items: center;
  gap: 0 .5em;
  position: relative;
  cursor: pointer;
}
.modal-priority label::before,
.modal-priority label::after {
  border-radius: 50%;
  content: '';
}
.modal-priority label::before {
  width: 18px;
  height: 18px;
  border: 2px solid #dee5eb;
  box-sizing: border-box;
}
.modal-priority label::after {
  position: absolute;
  top: 50%;
  left: 9px;
  transform: translate(-50%, -50%);
  width: 9px;
  height: 9px;
  background-color: #dee5eb;
}
.modal-priority label:has(:checked)::after {
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

.close {
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