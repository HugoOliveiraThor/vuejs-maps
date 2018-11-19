// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require('dotenv').config()
import Vue from "vue";
import App from "./App";
import router from "./router";
import firebase from "firebase";
Vue.config.productionTip = false;

let app = null;

// Waiting for firebase auth to init before creating the app
firebase.auth().onAuthStateChanged(() => {
  /* eslint-disable no-new */
  // init app if not already created
  if (!app) {
    app = new Vue({
      el: "#app",
      router,
      components: { App },
      template: "<App/>"
    });
  }
});
