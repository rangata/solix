<template>

</template>

<script>
export default {
  props: ['id'],
  name: 'PatientFile',

  data() {
    return {
      currentPatient: '',
    };
  },
  mounted() {
    console.log(this.$props.id);
  },
};
</script>

<style scoped>

</style>
