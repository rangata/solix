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
    },
  },
  mutations: {
    addProcedureToPatient(state, payload) {
      console.log(state.patients.indexOf(state.currentPatient));
    },
    savePatient(state, payload) {
      state.patients.push(payload);
    },
    addPaymentToPatient(state, payload) {
      state.patients[payload.idx].patientInfo.payments.push({
        amount: payload.amount,
        payed: payload.payed,
      });
    },
    setCurrentPatient(state, payload) {
      state.currentPatient = payload;
    },
  },
  actions: {

  },
});
