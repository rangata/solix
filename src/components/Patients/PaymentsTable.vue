<template>
    <div>
        <b-card header-bg-variant="warning">
            <div slot="header">
                <h3>
                    Плащания:
                </h3>
            </div>
        <b-container>

        </b-container>
            <b-card-body>
              <b-select :options="filterCriterial" v-model="filterCriteria" size="lg"></b-select>
              <br><br>
              <b-row  style="background-color: orange; padding: 10px;">
                <b-col cols="6">
                  ОТ дата:
                  <br>
                  ewf
                  <date-range-picker                      :timePicker24Hour="timePicker24Hour"
                                                          :locale-data="{ firstDay: 1, format: 'DD-MM-YYYY HH:mm:ss' }"
                  ></date-range-picker>
                  <!--<datepicker :typeable="true" :disable-dates="disabledDates" :format="$store.state.globalVariables.datepickerDateFormatLocale" inputClass="form-control form-control-lg" v-model="filterFromDate"></datepicker>-->
                </b-col>
                <b-col cols="6">
                  ДО тази дата:
                  <br>
                  <!--<datepicker :typeable="true" :format="$store.state.globalVariables.datepickerDateFormatLocale" inputClass="form-control form-control-lg" v-model="filterToDate"></datepicker>-->

                </b-col>
              </b-row>
              <br>
            <!--<b-table :items="patientData.item.patientInfo.payments"-->
            <b-table :items="filteredPayments"
                     :show-empty="true"
                     striped
                     :fields="[{key: 'status', label: 'Статус'},{key: 'amount', label: 'Платено'}, {key: 'datePayed', label: 'Дата:'}, { key: 'actions', label: 'Действия'}]">
                <template slot="amount" slot-scope="row">
                    {{ Number.parseInt(row.item.amount).toFixed(2) }} лв.
                </template>
                <template slot="actions" slot-scope="row">
                    <b-btn>Отбележи като платени</b-btn>
                </template>
                <!--<template slot="status" slot-scope="row">-->
                    <!--{{ row }}-->
                <!--</template>-->
              <template slot="empty" slot-scope="row">
                <h4>Няма данни за платени процедури</h4>
              </template>
            </b-table>
              <b-btn block @click="info" variant="success">Добави плащане</b-btn>
            </b-card-body>
        </b-card>

      <b-modal :id="paymentModalWindow.id"
               title="Добавяне на плащане: "
               @hide="resetInfoModal"
               size="xl">
        <b-row>
          <b-col cols="6">
            <b-form-group label-for="pm" label="Сума:">
              <b-input v-model="payment.amount"
                       @blur="isInputActive = false" @focus="isInputActive = true"
                       class="form-control form-control-lg"
                       style="padding: 90px; font-size: 110px"></b-input>
            </b-form-group>
          </b-col>
          <b-col cols="5">
            <b-form-group label-for="pm" label="Дата:">
              <datepicker v-model="payment.payedOnDate"
                          inputClass="form-control form-control-lg"
                          :format="$store.state.globalVariables.datepickerDateFormatLocale">
              </datepicker>
            </b-form-group>
            <b-form-group>
              <b-btn block variant="info" @click="todayDate">Днес е инкасирана сумата</b-btn>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group label-for="pm" label="Статус:">
                <b-checkbox size="lg">Платено?</b-checkbox>
            </b-form-group>
          </b-col>
        </b-row>
        <template slot="modal-footer">
          <b-btn-group>
            <b-btn variant="success" @click="addPayment">Добави и затвори</b-btn>
            <b-btn variant="danger" @click="$bvModal.hide('payment-modal')">Откажи</b-btn>
          </b-btn-group>
        </template>
      </b-modal>
    </div>
</template>

<script>
import VueMonthlyPicker from 'vue-monthly-picker/src/components/VueMonthlyPicker';
import DateRangePicker from 'vue2-daterange-picker'



export default {
  components: {VueMonthlyPicker, DateRangePicker  },
  props: ['patientProceduresData'],
  name: 'PaymentsTable',
  data() {
    return {
      disabledDates: {
       ranges: [
         {
           from: new Date(2019, 7, 1),
           to: new Date(2019, 7, 10)
         }
       ],
      },
      filterCriteria: '',
      filterCriterial: [
        {
          value: 'currentMonth',
          text: 'Текущия месец',
        },
        {
          value: 'range',
          text: 'В диапазона',
        },
      ],
      filterRange: false,
      patientData: this.$props.patientProceduresData,
      selectedMonth: '',
      filterFromDate: '',
      filterToDate: '',
      temp: [],
      paymentModalWindow: {
        id: 'payment-modal',
        title: '',
        content: '',
      },
      isInputActive: false,
      payment: {
        amount: 0,
        payedOnDate: '',
        status: '',
      },
      currentPatient: this.$store.state.currentPatient,
      monthLabels: [
        'Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни', 'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември',
      ],
    };
  },
  methods: {
    todayDate () {
      this.payment.payedOnDate = Date.now()
    },
    logpa(info) {
      this.currentPatient = info;
      this.$store.state.patients.forEach((patient, id) => {
        if (patient === this.currentPatient) {
          this.currentPatientIndexId = id;
        }
      });
      this.info(this.currentPatient);
    },
    info(item, index, button) {
      this.paymentModalWindow.content = item;
      this.$root.$emit('bv::show::modal', this.paymentModalWindow.id, button);
    },
    addPayment() {
      const idx = this.$store.state.patients.indexOf(this.$props.patientProceduresData.item);
      // TODO!!!!!
      this.payment.amount = Number.parseFloat(this.payment.amount);
      this.payment.payedOnDate = this.$moment(this.payment.payedOnDate).format(this.$store.state.globalVariables.momentDateFormatLocale)
      this.$store.commit('addPaymentToPatient', {
        payment: this.payment,
        recordId: idx
      });
    },
    resetInfoModal() {
      this.paymentModalWindow.title = '';
      this.paymentModalWindow.content = '';
    },
  },
  mounted() {
  },
  computed: {
    filteredPayments () {
        var vm = this
        var startDate = this.$moment(vm.filterFromDate).format(this.$store.state.globalVariables.momentDateFormatLocale)
      var endDate = this.$moment(vm.filterToDate).format(this.$store.state.globalVariables.momentDateFormatLocale)
      return this.$_.filter(this.$props.patientProceduresData.item.patientInfo.payments, (data) => {
        if (this.$_.isNull(startDate) && this.$_.isNull(endDate)) {
          return
        } else  {
          var d = data.datePayed
          console.log(startDate.slice(3));
          return (d >= startDate && d <= endDate && d >= startDate)
        }
      })
    }
  }
};
</script>

<style scoped>

</style>
