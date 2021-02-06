<template>
  <v-container>
    <v-btn color="primary" elevation="2" @click.prevent="logout">
      Deslogar
    </v-btn>
    <ApplicationForm
      :type="type"
      :application="application"
      @changeType="type = $event"
    >
    </ApplicationForm>
    <ApplicationList
      @onEdit="handleEdit"
      @findCPF="findCPF"
      :searchCPFMsg="searchCPFMsg"
    />
  </v-container>
</template>
<script>
  import ApplicationForm from '../components/ApplicationForm';
  import ApplicationList from '../components/ApplicationList';
  import { api } from '../services';
  import { formatDate2 } from '../helpers/utils';
  export default {
    name: 'Home',
    components: { ApplicationForm, ApplicationList },
    data: () => ({
      searchCPFMsg: '',
      type: 'create',
      application: {
        user_id: '',
        location_id: '',
        lot_id: '',
        category_id: '',
        servicegroup_id: '',
        vaccinator_id: '',
        application_date: '',
        dose: null,
        citizen: {
          cpf: '',
          cns: '',
          name: '',
          birthday: '',
        },
      },
    }),
    methods: {
      logout() {
        this.$store.dispatch('logout');
        this.$router.push({ name: 'login' });
      },
      edit() {
        this.$router.push({ name: 'edit' });
      },
      handleEdit(application) {
        console.log(application);
        this.type = 'edit';
        this.application = { ...application };
        this.application.citizen = { ...application.citizen };
        const birthday = this.application.citizen.birthday;
        if (birthday) {
          this.application.citizen.birthday = formatDate2(birthday);
        }
      },
      findCPF(cpf) {
        this.searchCPFMsg = 'Procurando CPF...';
        api.get(`applications?cpf=${cpf}`).then(({ data }) => {
          if (data.data.length !== 0) {
            this.application = data.data[0];
            const birthday = data.data[0].citizen.birthday;
            if (birthday) {
              this.application.citizen.birthday = formatDate2(birthday);
            }
            this.searchCPFMsg = '';
            this.type = 'edit';
          } else {
            this.searchCPFMsg = 'Esse CPF não consta em nossa base';
          }
        });
      },
    },
  };
</script>

<style scoped lang="scss">
  .btn {
    margin: auto;
    margin-top: 20px;
    margin-bottom: 10px;
  }
</style>
