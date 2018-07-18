import Vue from 'nativescript-vue'
import Vuex from 'vuex'
import Sqlite from 'nativescript-sqlite'

Vue.use(Vuex);

const Store = new Vuex.Store({
  state: {
    database: null,
    collections: []
  },
  mutations: {
    init(state, data) {
      state.database = data.database
    },
    fetch(state, data) {
      state.collections = data;
    },
    save(state, data) {
      state.collections.push(data);
    }
  },
  actions: {
    init(store) {
      (new Sqlite('todo.db')).then(db => {
        db.execSQL('CREATE TABLE IF NOT EXISTS todos (' +
            'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
            'name TEXT NOT NULL,' +
            'status INTEGER NOT NULL DEFAULT 0' +
            ')').then(id => {
          store.commit('init', {database: db});
        }, error => {
          console.log('Create table error', error);
        });
      }, error => {
        console.log('Database opening error', error);
      })
    },

    insert(store, data) {
      store.state.database.execSQL('INSERT INTO todos (name) VALUES (?)', [data]).then(id => {
        console.log('Todo ID', id);
        store.commit('save', {id, data, status: 0});
      }, error => {
        console.log('Insert error', error);
      })
    },

    fetch(store) {
      store.state.database.all('SELECT * FROM todos', []).then(results => {
        let refinedResult = [];
        results.forEach((result, index) => {
          refinedResult.push({
            id: result[0],
            name: result[1],
            status: result[2]
          })
        });
        console.log(refinedResult);
        store.commit('fetch', refinedResult);
      }, error => {
        console.log('Select error', error);
      })
    },

    deleteRecord(store) {

    }
  },
  getters: {}
});

Vue.prototype.$store = Store;

Store.dispatch('init');

export default Store;