import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    diagnosys: [
      'херния дискалис',
      'шип на пета',
      'фрактура',
      'футболна болест',
      'сколиоза',
      'радикулопатия',
      'периартрит',
      'алопластика',
      'осгут шлатер',
      'спондилоза',
      'невропатия',
      'гонартроза',
      'дисторзио',
      'инсулт',
      'епикондилит',
      'опер.мениск',
      'шийна спондилоза',
      'периартрит',
      'бицепс брахий',
      'дискови протр. Шия АИ',
      'латерален епикондилит АИ',
      'луксация ЛРС',
      'дискови пр. Лумбално',
      'Травма на лиг.пателеАИ',
      'ДХ-лумбално',
      'Коксартроза, ДХ',
      'квадрипареза',
      'МС',
      'луксация сакрум',
      'перитонит',
      'ентензопатия',
    ],
    patients: [],
    currentPatient: '',
    globalVariables: {
      momentDateFormatLocale: 'DD.MM.Y',
      datepickerDateFormatLocale: 'dd.MM.yyyy',
    },
  },
  mutations: {
    addProcedureToPatient(state, payload) {
      state.patients[payload.idx].patientInfo.procedures.push({
          title: payload.procedureTitle,
          qty: payload.procedureQty
      });
    },
    savePatient(state, payload) {
      state.patients.push(payload);
    },
    addPaymentToPatient(state, payload) {
      state.patients[payload.recordId].patientInfo.payments.push({
        amount: payload.payment.amount,
        datePayed: payload.payment.payedOnDate,
      });
      console.log(state.patients[payload.recordId]);
    },
    setCurrentPatient(state, payload) {
      state.currentPatient = payload;
    },
  },
  actions: {

  },
});
