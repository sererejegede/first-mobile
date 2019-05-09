import Vue from 'nativescript-vue';
import Store from './store';
import moment from 'moment';

import HelloWorld from './components/HelloWorld';


import './styles.scss';

Vue.filter('humanTime', function (value) {
  if (value) {
    return moment(value).fromNow()
  }
});

// Uncommment the following to see NativeScript-Vue output logs
Vue.config.silent = false;

new Vue({

  render: h => h(HelloWorld),
  Store

}).$start();
