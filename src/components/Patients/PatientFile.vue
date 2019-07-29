<template>
<b-container fluid>
    <h1>
        {{ currentPatient.firstname }} {{ currentPatient.lastname }}

    </h1>
    <b-card>
        <h3 class="text-capitalize text-left">
            <!--Диагноза: {{ currentPatient.patientInfo.diagno }}-->
        </h3>
      {{ currentPatient.patientInfo}}
      <procedures-table :patient-procedures-data="currentPatient"></procedures-table>
        <!--<payments-table :patient-procedures-data="currentPatient.patientInfo"></payments-table>-->
    </b-card>
</b-container>
</template>

<script>
import PaymentsTable from './PaymentsTable';
import ProceduresTable from "./ProceduresTable";

export default {
  components: {ProceduresTable, PaymentsTable },
  props: ['id'],
  name: 'PatientFile',

  data() {
    return {
      row: '',
      currentPatient: this.$store.state.currentPatient,
    };
  },
  mounted() {
    // this.$_.filter(this.currentPatient.patientInfo.payments, (filteredPayment) => {
    //   return console.log(this.$moment(filteredPayment.payed).format('MM'));
    // })
    console.log(this.$store.state.currentPatient);
  },
  beforeDestroy() {
    // this.$store.commit('setCurrentPatient', '');
  },
};
</script>

<style scoped>

</style>
