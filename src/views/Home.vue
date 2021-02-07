<template>
  <v-container>
    <div class="menu mx-auto mt-5">
      <v-select
        solo
        v-model="selectedMenu"
        :items="menuItems"
        :label="this.$store.state.user.name || 'Carregando...'"
        color="indigo"
        @change="handleMenuClick()"
      ></v-select>
    </div>
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
      selectedMenu: '',
      menuItems: [{ text: 'Deslogar', value: 'logout' }],
    }),
    methods: {
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
      handleMenuClick() {
        if (this.selectedMenu === 'logout') {
          this.$store.dispatch('logout');
          this.$router.push({ name: 'login' });
        }
        if (this.selectedMenu === 'change-password') {
          this.$router.push({ name: 'updatepassword' });
        }
        if (this.selectedMenu === 'update-user-data') {
          $router.push({ name: 'updateuserdata' });
        }
        this.selectedMenu = '';
      },
    },
  };
</script>

<style scoped lang="scss">
  .menu {
    width: 200px;
  }
</style>
