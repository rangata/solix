<template>
    <b-container fluid>
        <h1>
            Пациенти
        </h1>
        <b-container fluid>
            <b-btn color="primary" @click="$router.push('/patients/create')"
                                    v-show="$route.fullPath !== '/patients/create'"
                                   :disabled="$route.fullPath === '/patients/create'">
                Нов пациент
            </b-btn>
            <b-btn variant="warning" v-show="$route.fullPath === '/patients/create'" @click="$router.push('/patients')">Откажи</b-btn>
        </b-container>
        <router-view />
        <patient-table-component v-show="$route.fullPath !==  '/patients/create'"></patient-table-component>
    </b-container>
</template>

<script>
import PatientTableComponent from '../../components/Patients/PatientTableComponent';
export default {
  name: 'PatientIndex',
  components: { PatientTableComponent },
};
</script>

<style scoped>

</style>
