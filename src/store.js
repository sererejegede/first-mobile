import Vue from 'nativescript-vue'
import Vuex from 'vuex'
import Sqlite from 'nativescript-sqlite'

Vue.use(Vuex);

const Store = new Vuex.Store({
  state: {
    database: null,
    todos: []
  },
  mutations: {
    init(state, data) {
      state.database = data.database
    },
    fetch(state, data) {
      state.todos = data;
    },
    save(state, data) {
      state.todos.push(data);
    }
  },
  actions: {
    init(store) {
      (new Sqlite('todo.db')).then(db => {
        db.execSQL('CREATE TABLE IF NOT EXISTS todos (' +
            'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
            'name TEXT NOT NULL,' +
            'status INTEGER NOT NULL DEFAULT 0,' +
            'created_at INTEGER NOT NULL,' +
            'completed_at INTEGER' +
            ')').then(id => {
              console.log('Table created', id);
          store.commit('init', {database: db});
        }, error => {
          console.log('Create table error', error);
        });
      }, error => {
        console.log('Database opening error', error);
      })
    },

    insert(store, data) {
      store.state.database.execSQL('INSERT INTO todos (name, created_at) VALUES (?, ?)', [data.name, data.created_at]).then(id => {
        console.log('Todo ID', id);
        store.commit('save', {id, data, status: 0});
      }, error => {
        console.log('Insert error', error);
      })
    },

    update(store, data) {
      store.state.database.execSQL('UPDATE todos SET status = ?, completed_at = ? WHERE id = ?', [data.action, data.completed_at, data.id]).then(response => {
        console.log('Update response', response);
      }, error => {
        console.log('Update error', error);
      })
    },

    fetch(store) {
      store.state.database.all('SELECT * FROM todos', []).then(results => {
        let refinedResult = [];
        results.forEach((result, index) => {
          refinedResult.push({
            id: result[0],
            name: result[1],
            status: result[2],
            created_at: result[3],
            completed_at: result[4]
          })
        });
        console.log(refinedResult);
        store.commit('fetch', refinedResult);
      }, error => {
        console.log('Select error', error);
      })
    },

    deleteRecord(store, data) {
      store.state.database.execSQL('DELETE FROM todos WHERE id = ?', [data.id]).then(response => {
        console.log('Delete response', response);
      }, error => {
        console.log('Delete error', error);
      })
    }
  },
  getters: {
    completedTodos(state) {
      return state.todos.filter(todo => {
        return todo.status === 1;
      });
    },
    incompleteTodos(state) {
      return state.todos.filter(todo => {
        return todo.status === 0;
      });
    }
  }
});

Vue.prototype.$store = Store;

Store.dispatch('init');

export default Store;