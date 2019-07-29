<template>
<b-container>
  <h1>
    hierl
  </h1>
  <ejs-schedule></ejs-schedule>
</b-container>
</template>

<script>
  import '@syncfusion/ej2-base/styles/material.css'
  import Vue from "vue";
  import { addClass, extend, closest } from '@syncfusion/ej2-base';
  import { SchedulePlugin, TimelineViews, TimelineMonth, View, Resize, DragAndDrop } from "@syncfusion/ej2-vue-schedule";
  Vue.use(SchedulePlugin);
  import { TreeViewPlugin } from "@syncfusion/ej2-vue-navigations";
  Vue.use(TreeViewPlugin);

  export default {
  name: 'Scheduler',

};
</script>

<style scoped>

</style>
