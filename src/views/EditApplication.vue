<template>
  <section>
    <h1>Editar dados</h1>
    <ApplicationForm
      type="edit"
      :application="application"
      :checkedCPF="checkedCPF"
      ref="applicationForm"
    >
      <button class="btn" @click.prevent="updateApplication">
        Atualizar
      </button>
    </ApplicationForm>
    <div class="message">
      {{ message }}
    </div>
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
          birthday: '',
        },
      },
      message: '',
      CPFValidationMsg: '',
      checkedCPF: false,
    }),
    methods: {
      updateApplication() {
        if (!this.$refs.applicationForm.isDataValidated()) return;
        this.message = 'Enviando dados...';

        const birthday = this.application.citizen.birthday;
        if (birthday) {
          this.application.citizen.birthday = formatDate1(birthday);
        }

        this.application.user_id = this.$store.state.user.id;
        api
          .put('/applications', this.application)
          .then(() => {
            this.message = '';
            this.$refs.applicationForm.clearForm();
            Swal.fire({
              icon: 'success',
              title: 'Alteração realizada com êxito',
              text: 'Os dados foram atualizados com sucesso!',
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch(() => {
            this.message = '';
            Swal.fire({
              icon: 'error',
              title: 'Erro ao atualizar',
              text: 'Ocorreu algum erro. Por favor, tente novamente.',
              showConfirmButton: false,
              timer: 2000,
            });
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
