<template>
    <div>
        <b-card header-bg-variant="warning">
            <div slot="header">
                <h3>
                    Плащания:
                </h3>
            </div>
            <b-card-body>
                <b-row style="background-color: bisque; padding: 25px;">
                   <b-col>
                       <b-form-group label-for="filterFromDate" label="Избери месец:">
                           <vue-monthly-picker
                                   id="filterFromDate"
                                   dateFormat="MMMM Y"
                                   :monthLabels="monthLabels"
                                   v-model="filterFromDate"
                                   inputClass="form-control form-control-lg">
                           </vue-monthly-picker>
                       </b-form-group>
                   </b-col>
                    <!--TODO: Month range!!!!!!!! -->
                   <!--<b-col>-->
                       <!--<b-form-group label-for="filterToDate" label="До:">-->
                           <!--<vue-monthly-picker-->
                                   <!--id="filterToDate"-->
                                   <!--dateFormat="MMMM Y"-->
                                   <!--:monthLabels="monthLabels"-->
                                   <!--v-model="filterToDate"-->
                                   <!--inputClass="form-control form-control-lg">-->
                           <!--</vue-monthly-picker>-->
                       <!--</b-form-group>-->
                   <!--</b-col>-->
                </b-row>
                <br>
                <b-table :items="patientData.payments"
                         :show-empty="true"
                         striped
                         :fields="[{key: 'amount', label: 'Платено'}, {key: 'payed', label: 'Дата:'}]">
                    <template slot="amount" slot-scope="row">
                        {{ Number.parseInt(row.item.amount).toFixed(2) }} лв.
                    </template>
                </b-table>
            </b-card-body>
        </b-card>
    </div>
</template>

<script>
import VueMonthlyPicker from 'vue-monthly-picker/src/components/VueMonthlyPicker';

export default {
  components: { VueMonthlyPicker },
  props: ['patientProceduresData'],
  name: 'PaymentsTable',
  data() {
    return {
      patientData: '',
      selectedMonth: '',
      filterToDate: '',
      filterFromDate: '',
      monthLabels: [
        'Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни', 'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември',
      ],
    };
  },
  mounted() {
    this.patientData = this.patientProceduresData;
  },
};
</script>

<style scoped>

</style>
