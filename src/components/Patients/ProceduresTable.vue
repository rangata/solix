<template>
    <b-container fluid>
        <b-card header-bg-variant="info">
            <div slot="header">
                <h3>
                    Процедури:
                </h3>
            </div>
            <b-card-body>
                <b-table :show-empty="true"
                         :fields="[{key: 'qty', label: 'Количество'},{key: 'title', label: 'Наименование на процедурата'}]"
                         :items="patientData.item.patientInfo.procedures">
                  <template slot="empty" slot-scope="scope">
                    <h4>Няма данни за назначени процедури</h4>
                  </template>
                </b-table>
                <div>
                    <b-btn variant="info" @click="info">Добави процедура</b-btn>
                </div>
            </b-card-body>
        </b-card>
        <b-modal :id="procedureModal.id"
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
                   <b-btn variant="danger" @click="$bvModal.hide(procedureModal.id)">Откажи</b-btn>
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
      procedureModal: {
        id: `ptp-${this.$props.patientProceduresData.item.uniqId}`,
        title: '',
        content: '',
      },
      currentPatient: this.$store.state.currentPatient,
    };
  },
  mounted() {
    console.log("props,", this.$props);
    if(this.$props.patientProceduresData.length <= 0) {
      this.patientData = this.$store.state.currentPatient;
    } else {
      this.patientData = this.$props.patientProceduresData;
    }
  },
  methods: {
    info(item, index, button) {
      this.procedureModal.content = item;
      this.$root.$emit('bv::show::modal', this.procedureModal.id, button);
    },
    resetInfoModal() {
      this.procedure.procedureQty = '';
      this.procedure.procedureTitle = '';
    },
    saveProcedureToPatient() {
      this.procedure.idx = this.$store.state.patients.indexOf(this.$props.patientProceduresData.item);
      console.log(this.procedure.idx);
      this.$store.commit('addProcedureToPatient', this.procedure);
    },
  },
};
</script>

<style scoped>

</style>
