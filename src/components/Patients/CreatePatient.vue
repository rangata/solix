<template>
    <b-container fluid>
      <br>
        <b-card>
          <div slot="header">
            <h1>
              Създаване на нов пациент
            </h1>
          </div>

          <b-form @submit.stop.prevent="onSubmit">
            <b-row>
              <b-col>
                <b-form-group id="example-input-group-1" label="Име" label-for="example-input-1">
                  <b-form-input
                    id="example-input-1"
                    name="example-input-1"
                    v-model="$v.patient.firstname.$model"
                    :state="$v.patient.firstname.$dirty ? !$v.patient.firstname.$error : null"
                    aria-describedby="input-1-live-feedback"
                    size="lg"
                  ></b-form-input>

                  <b-form-invalid-feedback id="input-1-live-feedback">
                      Това поле трябва да е поне 3 символа и е задължително!
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label-for="middlename" label="Презиме:" class="text-xl-left">
                  <b-input v-model="patient.middlename" size="lg"></b-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group id="lastname-form-group" label="Фамилия" label-for="lastname-input">
                  <b-form-input
                    id="lastname-input"
                    name="lastname-input"
                    v-model="$v.patient.lastname.$model"
                    :state="$v.patient.lastname.$dirty ? !$v.patient.lastname.$error : null"
                    aria-describedby="lastname-input-live-feedback"
                    size="lg"
                  ></b-form-input>

                  <b-form-invalid-feedback id="lastname-input-live-feedback">
                    Това поле трябва да е поне 3 символа и е задължително!
                  </b-form-invalid-feedback>
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
                <b-btn block variant="success" @click="createAndSelectNewPatient(patient)">Запиши и избери</b-btn>
              </b-col>
              <b-col>
                <b-btn block variant="info">Запиши</b-btn>
              </b-col>
            </b-row>
            <br>
          </b-form>
        </b-card>

      <b-toast id="my-toast" variant="warning" solid>
        <div slot="toast-title" class="d-flex flex-grow-1 align-items-baseline">
          <b-img blank blank-color="#ff5555" class="mr-2" width="12" height="12"></b-img>
          <strong class="mr-auto">Notice!</strong>
          <small class="text-muted mr-2">42 seconds ago</small>
        </div>
        This is the content of the toast.
        It is short and to the point.
      </b-toast>
    </b-container>
</template>

<script>
import 'vue-select/dist/vue-select.css';
import Datepicker from 'vuejs-datepicker';
import md5 from 'js-md5';
import { validationMixin } from 'vuelidate';
import { required, minLength } from 'vuelidate/lib/validators';

export default {


  name: 'CreatePatient',
  components: {
    Datepicker,
  },
  data() {
    return {
      foods: ['apple', 'orange'],
      form: {
        name: null,
        food: null,
      },
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
          procedures: [],
        },
      },
    };
  },
  validations: {
    patient: {
      firstname: {
        required,
        minLength: minLength(3),
      },
      lastname: {
        required,
        minLength: minLength(3),
      },
    },
  },
  mounted() {
    this.calculateAge('1990-04-30');
  },
  methods: {
    calculateAge(birthday) {
      const parsedDate = this.$moment(birthday);
      const firstDigit = parsedDate.fromNow()[0];
      const secDigit = parsedDate.fromNow()[1];

      const age = firstDigit + secDigit;
      return age;
    },
    setPatientRecorDate() {
      this.patient.patientRecord = Date.now();
      this.patient.patientRecordDisabled = !this.patient.patientRecordDisabled;
    },
    createNewPatient(patientData) {
      if (this.$v.$invalid) {
        // $bvToast.show('my-toast');
        this.$bvToast.show('my-toast');
        this.$v.patient.$touch()
      } else {
        this.patient.age = this.calculateAge(this.patient.birthday);
        this.patient.fullName = `${this.patient.firstname} ${this.patient.lastname}`;
        this.patient.uniqId = md5(`${this.patient.firstname} ${this.patient.lastname}`);
        this.$store.commit('savePatient', patientData);
      }
    },
    createAndSelectNewPatient(patientData) {
      if (this.$v.$invalid) {
        // $bvToast.show('my-toast');
        this.$bvToast.show('my-toast');
        this.$v.patient.$touch()
      } else {
        this.patient.age = this.calculateAge(this.patient.birthday);
        this.patient.fullName = `${this.patient.firstname} ${this.patient.lastname}`;
        this.patient.uniqId = md5(`${this.patient.firstname} ${this.patient.lastname}`);
        this.$store.commit('savePatient', patientData);

        let lastId = this.$store.state.patients.length -1;

        this.$router.push({
          path: `/patients/${this.$store.state.patients[lastId].uniqId}`,
          id: lastId.uniqId,
          patient: lastId,
        });
        this.$store.commit('setCurrentPatient', '')

        this.$store.commit('setCurrentPatient', this.$store.state.patientInfo[lastId])
      }
    }
  },
  computed: {
    onSubmit() {
      this.$v.patient.$touch();
      if (this.$v.patient.$anyError) {
      }
    },
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
