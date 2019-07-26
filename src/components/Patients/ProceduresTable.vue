<template>
    <b-container fluid>
        <b-card header-bg-variant="info">
            <div slot="header">
                <h3>
                    Процедури:
                </h3>
            </div>
            <b-card-body>
                {{ patientData.item.patientInfo.procedures }}
                <b-table :show-empty="true" :items="patientData.item.patientInfo.procedures">
                </b-table>
                <div>
                    <b-btn variant="info" @click="info">Добави процедура</b-btn>
                </div>
            </b-card-body>
        </b-card>
        <b-modal :id="paymentModal.id"
                 title="Добавяне на процедура"
                 @hide="resetInfoModal"
                 size="xl">
         <b-row>
             <b-col cols="10">
                 <b-form-group label-for="pm" label="Наименование:">
                     <b-input v-model="procedure.procedureTitle"></b-input>
                 </b-form-group>
             </b-col>
             <b-col cols="2">
                 <b-form-group label-for="pm" label="Количество:">
                     <b-input v-model="procedure.procedureQty"></b-input>
                 </b-form-group>
             </b-col>
         </b-row>
            <template slot="modal-footer">
               <b-btn-group>
                   <b-btn variant="success" @click="saveProcedureToPatient">Добави и затвори</b-btn>
                   <b-btn variant="danger" @click="$bvModal.hide('info-modal')">Откажи</b-btn>
               </b-btn-group>
            </template>
        </b-modal>
    </b-container>
</template>

<script>
export default {
  props: ['patientProceduresData'],
  name: 'ProceduresTable',

  data() {
    return {
      patientData: this.$props.patientProceduresData,
      procedure: {
        idx: '',
        procedureTitle: '',
        procedureQty: '',
      },
      paymentModal: {
        id: 'info-modal',
        title: '',
        content: '',
      },
      currentPatient: this.$store.state.currentPatient,
    };
  },
  methods: {
    info(item, index, button) {
      const keyId = this.$store.state.patients.indexOf(this.currentPatient);
      // console.log(this.currentPatient);
      this.paymentModal.content = item;
      this.$root.$emit('bv::show::modal', this.paymentModal.id, button);
    },
    resetInfoModal() {
      this.procedure.idx = '';
      this.procedure.procedureQty = '';
      this.procedure.procedureTitle = '';
    },
    saveProcedureToPatient() {
      this.$store.commit('addProcedureToPatient', this.procedure);
    },
  },
};
</script>

<style scoped>

</style>
