<template>
<b-container fluid>
    <br>
    <b-row>
      <b-col md="6" class="my-1">
        <b-form-group label-cols-sm="3" label="Поажи ми: " class="mb-0">
          <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
          записи на страница
        </b-form-group>
      </b-col>
        <b-col lg="12">
            <b-form-group  label="Търси:" class="text-left">
                <b-input-group>
                    <b-form-input v-model="filter" placeholder="Търси"></b-form-input>
                    <b-input-group-append>
                        <b-button :disabled="!filter" @click="filter = ''">Изчисти</b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-form-group>
        </b-col>

    </b-row>
    <b-table
            show-empty
            stacked="md"
            :items="$store.state.patients"
            :fields="fields"
            :current-page="currentPage"
            :per-page="perPage"
            :filter="filter"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :sort-direction="sortDirection"
            striped
            @filtered="onFiltered"
    >
        <template slot="lineId" slot-scope="row">
            {{ row.index +=1 }}
        </template>
        <template slot="age" slot-scope="row">
            {{ row.item.age }}
        </template>

        <template slot="actions" slot-scope="row">
            <b-btn-group>
                <b-button size="sm" variant="info" @click="navToFile(row.item.uniqId)">Към досието</b-button>
                <b-button size="sm" @click="row.toggleDetails">
                    {{ row.detailsShowing ? 'Затвори' : 'Бърз преглед' }}
                </b-button>
            </b-btn-group>
        </template>

        <template slot="row-details" slot-scope="row">
            <b-card>
                <h3 class="text-capitalize text-left">
                    Диагноза:
                </h3>
                <b-list-group>
                    <b-list-group-item v-for="(diagnose, key) in row.item.patientInfo.diagno" :key="key" :active="key === 0">
                        {{ diagnose }}
                    </b-list-group-item>
                </b-list-group>
              <br>
              <br>

                <procedures-table :patient-procedures-data="row"></procedures-table>
                <br>
                <payments-table :patient-procedures-data="row"></payments-table>
                <br>
            </b-card>
            <b-btn block variant="success" @click="navToFile(row.item.uniqId)">към пълното досие</b-btn>
        </template>

    </b-table>

    <b-row>
        <b-col md="6" class="my-1">
            <b-pagination
                    v-model="currentPage"
                    :total-rows="totalRows"
                    :per-page="perPage"
                    class="my-0"
            ></b-pagination>
        </b-col>
    </b-row>
</b-container>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import ProceduresTable from './ProceduresTable';
import PaymentsTable from './PaymentsTable';

export default {
  name: 'PatientTableComponent',
  components: { Datepicker, PaymentsTable, ProceduresTable },
  data() {
    return {
      fields: [
        {
          key: 'lineId', label: '№',
        },
        {
          key: 'firstname', label: 'Име', sortable: true, sortDirection: 'desc',
        },
        {
          key: 'lastname', label: 'Фамилия', sortable: true, class: 'text-center',
        },
        {
          key: 'age', label: 'Възраст', sortable: true, class: 'text-center',
        },
        { key: 'actions', label: 'Actions' },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      sortBy: null,
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      infoModal: {
        id: 'payment-modal',
        title: '',
        content: '',
      },
      amountValue: '',
      currentPatient: '',
      currentPatientIndexId: 0,
      selectedDate: this.$moment(Date.now()).format(this.$store.state.globalVariables.momentDateFormatLocale),
    };
  },
  mounted() {
    this.totalRows = this.$store.state.patients.length;
  },
  methods: {
    navToFile(id) {
      const storePatientIndex = this.$store.state.patients.indexOf(this.$store.state.patients.find(element => element.uniqId === id));
      if (storePatientIndex !== -1) {
        this.currentPatient = this.$store.state.patients[storePatientIndex];
      } else {
        alert('Somethings wrong 162!');
      }
      this.$store.commit('setCurrentPatient', this.currentPatient);
      this.$router.push({
        name: 'patientFile',
        params: {
          id,
          currentPatients: this.currentPatient,
        },
      });
    },

    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }));
    },
  },
};
</script>
