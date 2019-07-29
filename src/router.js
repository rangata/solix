import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import PatientIndex from './views/patients/Index.vue';
import CreatePatient from './components/Patients/CreatePatient.vue';
import PatientFile from './components/Patients/PatientFile.vue';
import Scheduler from './components/Scheduler.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/scer',
      name: 'sched',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Scheduler,
    },
    {
      path: '/patients',
      name: 'patients',
      component: PatientIndex,
      children: [
        {
          path: 'create',
          name: 'new',
          component: CreatePatient,
        },
      ],
    },
    {
      path: '/patients/:id',
      name: 'patientFile',
      component: PatientFile,
    },
  ],
});
