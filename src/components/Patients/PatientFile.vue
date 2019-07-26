<template>
<b-container fluid>
    <h1>
        {{ currentPatient.firstname }} {{ currentPatient.lastname }}

    </h1>
    <b-card>
        <h3 class="text-capitalize text-left">
            Диагноза: {{ currentPatient.patientInfo.diagno }}
        </h3>
        <br>
        {{ currentPatient.uniqId }}
        <br>
        <b-card header-bg-variant="info">
            <div slot="header">
                <h3>
                    Процедури:
                </h3>
            </div>
            <b-card-body>
                <b-table :items="currentPatient.patientInfo.procedures" :show-empty="true">
                </b-table>
                <div v-show="!currentPatient.patientInfo.procedures.length">
                    <b-btn variant="info">Добави процедура</b-btn>
                </div>
            </b-card-body>
        </b-card>
        <br>
        <div v-show="currentPatient.patientInfo.payments.length > 0">
            <b-card header-bg-variant="warning">
                <div slot="header">
                    <h3>
                        Плащания:
                    </h3>
                </div>
                <b-card-body>
                    <b-table :items="currentPatient.patientInfo.payments" :show-empty="true"
                             :fields="[{key: 'amount', label: 'Платено'}, {key: 'payed', label: 'Дата:'}]">
                        <template slot="amount" slot-scope="row">
                            {{ Number.parseInt(row.item.amount).toFixed(2) }} лв.
                        </template>
                    </b-table>
                </b-card-body>
            </b-card>
        </div>
        <b-btn variant="success" @click="logpa(currentPatient)">Добави плащане</b-btn>
    </b-card>
</b-container>
</template>

<script>
export default {
  props: ['id'],
  name: 'PatientFile',

  data() {
    return {
      row: '',
      currentPatient: '',
      patientId: this.$route.params.id,
    };
  },
  mounted() {
    this.currentPatient = this.$store.state.patients.find( element => element.uniqId === this.$route.params.id)
  },
};
</script>

<style scoped>

</style>
