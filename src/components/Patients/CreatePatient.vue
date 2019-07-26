<template>
    <b-container>
        <h1>
            Създаване на нов пациент
        </h1>

        <b-row>
            <b-col>
                <b-form-group label-for="firstname" label="Име:" class="text-xl-left">
                  <b-input id="firstname" v-model="patient.firstname" size="lg"></b-input>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group label-for="middlename" label="Презиме:" class="text-xl-left">
                    <b-input v-model="patient.middlename" size="lg"></b-input>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group label-for="lastname" label="Фамилия:" class="text-xl-left">
                    <b-input id="lastname" v-model="patient.lastname" size="lg"></b-input>
                </b-form-group>
            </b-col>
        </b-row>
        <br>
        <b-row>
            <b-col>
                <b-form-group label-for="firstname" label="Дата на раждане:" class="text-xl-left">
                   <datepicker :bootstrap-styling="true" :typeable="true" :format="'dd.MM.yyyy'" v-model="patient.birthday"></datepicker>
                </b-form-group>
            </b-col>
        </b-row>
        <br>
        <b-row>
            <b-col cols="6">
                <h3 class="text-lg-left">
                    <label for="doctors" >Лекуващи лекари: </label>
                </h3>
                <v-select taggable id="doctors" multiple :options="doctors">
                </v-select>
            </b-col>
            <b-col cols="6">
                <h3 class="text-lg-left">
                    <label for="doctors" >Терапевти: </label>
                </h3>
                <v-select taggable id="phys" multiple :options="physician" label="name">
                </v-select>
            </b-col>
        </b-row>
        <br>
        <b-row>
            <b-col>
                <b-form-group label="Диагноза:" class="text-left">
                    <v-select taggable multiple v-model="patient.patientInfo.diagno" :options="$store.state.diagnosys"></v-select>
                </b-form-group>
            </b-col>
        </b-row>
        <br>
        <b-row>
            <b-col cols="10">
                <h3 class="text-lg-left">
                    <label for="doctors" >Постъпва: </label>
                </h3>
                <datepicker :bootstrap-styling="true"
                            :typeable="patient.patientRecordDisabled"
                            ref="recData"
                            format="dd.MM.yyyy"
                            :disabled="false"
                            v-model="patient.patientRecord"></datepicker>
            </b-col>
            <b-col cols="2">
                <br><br>
                <b-btn block variant="success" @click="setPatientRecorDate()">Днес</b-btn>
            </b-col>
        </b-row>
        <br>
        <b-row>
            <b-col>
                <b-checkbox class="text-lg-left" v-model="patient.patientInfo.nzok">Пациент по НЗОК</b-checkbox>
            </b-col>
            <b-col>
                <b-checkbox class="text-lg-left">Частен</b-checkbox>
            </b-col>
        </b-row>


        <b-row>
            <b-col>
                <b-btn block variant="success" @click="createNewPatient(patient)">Запиши и избери</b-btn>
            </b-col>
            <b-col>
                <b-btn block variant="info">Запиши</b-btn>
            </b-col>
        </b-row>
        <br>
    </b-container>
</template>

<script>
import 'vue-select/dist/vue-select.css';
import Datepicker from 'vuejs-datepicker';
import md5 from 'js-md5';

export default {
  name: 'CreatePatient',
  components: {
    Datepicker,
  },
  data() {
    return {
      doctors: [
        {
          label: 'Д-р Жанет Думанова',
          code: 'JD',
        },
        {
          label: 'Д-р Мария Гонкова',
          code: 'MG',
        },
        {
          label: 'Д-р Александра Илиева',
          code: 'AI',
        },
      ],
      physician: [
        {
          name: 'Ради',
        },
        {
          name: 'Мери',
        },
        {
          name: 'Иван',
        },

      ],
      patient: {
        uniqId: '',
        firstname: '',
        middlename: '',
        lastname: '',
        phone: '',
        age: '',
        birthday: '',
        patientRecord: '',
        fullName: '',
        patientRecordDisabled: true,
        patientInfo: {
          diagno: [],
          therapefts: [],
          lekar: [],
          nzok: true,
          payments: [],
          procedures: []
        },
      },
    };
  },
  mounted () {
   this.calculateAge('1990-04-30');
  },
  methods: {
    calculateAge(birthday) {
      let parsedDate = this.$moment(birthday);
      let firstDigit = parsedDate.fromNow()[0]
      let secDigit = parsedDate.fromNow()[1]

      let age = firstDigit + secDigit
      return age;
    },
    setPatientRecorDate() {
      this.patient.patientRecord = Date.now();
      this.patient.patientRecordDisabled = !this.patient.patientRecordDisabled;
    },
    createNewPatient(patientData) {
      this.patient.age = this.calculateAge(this.patient.birthday)
      this.patient.fullName = `${this.patient.firstname} ${this.patient.lastname}`;
      this.patient.uniqId = md5(this.patient.firstname + ' ' + this.patient.lastname)
      this.$store.commit('savePatient', patientData);
    },
  },
  computed: {
  },
};
</script>

<!--<style>-->
<!--.vs__dropdown-toggle {-->
    <!--height: calc(1.5em + 1rem + 2px);-->
    <!--padding: 0.5rem 1rem;-->
    <!--font-size: 1.25rem;-->
    <!--line-height: 1.5;-->
    <!--border-radius: 0.3rem;-->
    <!--background-color: #fff;-->
<!--}-->
<!--</style>-->
