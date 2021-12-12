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
    calculateDuration(duration) {
      var h = Math.floor(duration / 1000 / 3600);
      var m = Math.floor(duration / 1000 % 3600 / 60);
      var s = Math.floor(duration / 1000 % 3600 % 60);
      var ms = duration - ( (h * 3600 * 1000) + ( m * 60 * 1000 ) + (s * 1000) );
      var hours = h > 0 ? h + (h == 1 ? " hr " : " hrs ") : "";
      var minutes = m > 0 ? m + (m == 1 ? " min " : " mins ") : "";
      var seconds = s > 0 ? s + (s == 1 ? " sec " : " sec ") : "";
      var miliseconds = ms > 0 ? ms + " ms" : "";
      return hours + minutes + seconds + miliseconds;
    },
    isAtFirstPage(startIndex) {
      return startIndex === 1 ? "disabled" : "";
    },
  }
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
