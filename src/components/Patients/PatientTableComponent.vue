<template>
<b-container fluid>
    <br>
    <!--{{ }}-->
    <b-row>
        <b-col md="6" class="my-1">
            <b-form-group label-cols-sm="3" label="Filter" class="mb-0">
                <b-input-group>
                    <b-form-input v-model="filter" placeholder="Търси"></b-form-input>
                    <b-input-group-append>
                        <b-button :disabled="!filter" @click="filter = ''">Изчисти</b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-form-group>
        </b-col>
        <b-col md="6" class="my-1">
            <b-form-group label-cols-sm="3" label="Per page" class="mb-0">
                <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
            </b-form-group>
        </b-col>
    </b-row>

    <!-- Main table element -->
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
                    Диагноза: {{ row.item.patientInfo.diagno }}
                </h3>
                <br>
                <br>
                <b-card header-bg-variant="info">
                    <div slot="header">
                        <h3>
                            Процедури:
                        </h3>
                    </div>
                    <b-card-body>
                        <b-table :items="row.item.patientInfo.procedures" :show-empty="true">
                        </b-table>
                        <div v-show="!row.item.patientInfo.procedures.length">
                            <b-btn variant="info">Добави процедура</b-btn>
                        </div>
                    </b-card-body>
                </b-card>
                <br>
                <div v-show="row.item.patientInfo.payments.length > 0">
                    <b-card header-bg-variant="warning">
                         <div slot="header">
                             <h3>
                                 Плащания:
                             </h3>
                         </div>
                        <b-card-body>
                            <b-table :items="row.item.patientInfo.payments" :show-empty="true"
                                     :fields="[{key: 'amount', label: 'Платено'}, {key: 'payed', label: 'Дата:'}]">
                                <template slot="amount" slot-scope="row">
                                    {{ Number.parseInt(row.item.amount).toFixed(2) }} лв.
                                </template>
                            </b-table>
                        </b-card-body>
                    </b-card>
                </div>
                <b-btn variant="success" @click="logpa(row.item)">Добави плащане</b-btn>
            </b-card>
            <b-btn block variant="success">към пълното досие</b-btn>
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

    <!-- Info modal -->
    <b-modal :id="infoModal.id" :title="infoModal.content.firstname + ' ' + infoModal.content.lastname + ' плаща:'"
             @hide="resetInfoModal"
             @ok="addPayment"
             size="xl">
        <b-form-group label-for="pm" label="Сума">
            <b-input id="pm" v-model="amountValue"></b-input>
        </b-form-group>
    </b-modal>
</b-container>
</template>

<script>
export default {
  name: 'PatientTableComponent',
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
        id: 'info-modal',
        title: '',
        content: '',
      },
      amountValue: '',
      currentPatient: '',
      currentPatientIndexId: 0,
    };
  },
  mounted() {
    this.totalRows = this.$store.state.patients.length;
  },
  methods: {
    navToFile (id) {
      this.$router.push({
        name: 'patientFile',
        params: {
          id: id
        }
      })
    },
    calcTotalPayed(items) {

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
      this.infoModal.content = item;
      this.$root.$emit('bv::show::modal', this.infoModal.id, button);
    },
    addPayment() {
      if (this.amountValue === 0) {

      } else {
        this.$store.commit('addPaymentToPatient', {
          keyId: this.currentPatientIndexId,
          amount: this.amountValue,
          payed: this.$moment(Date.now()).format('DD.MM.YYYY'),
        });
        this.currentPatientIndexId = 0;
        this.amountValue = '';
      }
    },
    resetInfoModal() {
      this.infoModal.title = '';
      this.infoModal.content = '';
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
