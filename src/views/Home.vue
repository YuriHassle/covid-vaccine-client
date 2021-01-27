<template>
  <section>
    <button class="btn" @click.prevent="logout">Deslogar</button>
    <ApplicationForm :application="application">
      <button class="btn" @click.prevent="saveApplication">
        Salvar
      </button>
    </ApplicationForm>
  </section>
</template>
<script>
  import { api } from '../services';
  import { formatDate1 } from '../helper';
  import Swal from 'sweetalert2';
  import ApplicationForm from '../components/ApplicationForm';
  export default {
    name: 'Home',
    components: { ApplicationForm },
    data: () => ({
      application: {
        user_id: '',
        location_id: '',
        lot_id: '',
        category_id: '',
        servicegroup_id: '',
        vaccinator_id: '',
        application_date: '',
        dose: 1,
        citizen: {
          cpf: '',
          cns: '',
          name: '',
          birthday: ''
        }
      }
    }),
    methods: {
      saveApplication() {
        if (!this.isValidData()) return;
        this.message = 'Enviando dados...';

        const birthday = this.application.citizen.birthday;
        if (birthday) {
          this.application.citizen.birthday = formatDate1(birthday);
        }

        this.application.user_id = this.$store.state.user.id;
        api
          .post('/applications', this.application)
          .then(() => {
            this.message = '';
            this.CPFValidationMsg = '';
            this.clearForm();
            Swal.fire({
              icon: 'success',
              title: 'Cadastrado com êxito',
              text: 'Os dados registrados com sucesso!',
              showConfirmButton: false,
              timer: 1500
            });
          })
          .catch(() => {
            this.message = '';
            Swal.fire({
              icon: 'error',
              title: 'Erro ao cadastrar',
              text: 'Ocorreu algum erro. Por favor, tente novamente.',
              showConfirmButton: false,
              timer: 2000
            });
          });
      },
      logout() {
        this.$store.dispatch('logout');
        this.$router.push({ name: 'login' });
      }
    }
  };
</script>

<style scoped lang="scss">
  .btn {
    margin: auto;
    margin-top: 20px;
    margin-bottom: 10px;
  }
</style>
