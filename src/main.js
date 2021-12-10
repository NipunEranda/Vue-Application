import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import { routes } from './routes';
import Home from './components/Home.vue';
import Job from './components/Job.vue';
const NotFound = { template: '<p>Page not found</p>' }
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';

Vue.component('home', Home);
Vue.component('Job', Job);
Vue.use(VueRouter);
Vue.use(BootstrapVue);

const router = new VueRouter({
  routes,
  mode: 'history'
});

Vue.mixin({
  methods: {
    isFailed(job) {
      return job.jobStatus === "Completed"
        ? "blue"
        : job.jobStatus === "Cancelled"
          ? "black"
          : "red";
    },
    loadJsonData() {
      setTimeout(() => {
        this.jobs = require("./data/JobJsonFile.json").jobs;
      }, 300);
    },
    isFailedIcon(job) {
      return job.jobStatus === "Completed"
        ? "fa fa-check-circle"
        : job.jobStatus === "Cancelled"
        ? "fa fa-ban"
        : "fa fa-exclamation-circle";
    },
    isFailedIconColor(job) {
      return job.jobStatus === "Completed"
        ? "green"
        : job.jobStatus === "Cancelled"
        ? "black"
        : "red";
    },
    calculateDuration(job) {
      let hours = Math.floor(job.duration / 3600);
      let minutes = Math.floor(job.duration / 60);
      let seconds = job.duration - minutes * 60;

      if (hours > 0) {
        minutes -= 60;
        return hours + "hrs " + minutes + "ms " + seconds + "s";
      } else if (minutes > 0 && seconds > 0) {
        return minutes + "ms " + seconds + "s";
      } else {
        return seconds + "s";
      }
    },
  }
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
