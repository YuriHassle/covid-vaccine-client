<template>
  <section class="container">
    <h1>Editar dados</h1>
    <button @click="$router.push({ name: 'home' })" class="btn">Voltar</button>
    <ApplicationForm
      type="edit"
      :application="application"
      :CPFValidationMsg="CPFValidationMsg"
      @findCPF="findCPF()"
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
  import { formatDate1, formatDate2, isValidCPF } from '../helper';
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
        this.application.updated_by = this.$store.state.user.id;
        api
          .put(`/applications/${this.application.id}`, this.application)
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
      findCPF() {
        const cpf = this.application.citizen.cpf;
        if (!cpf) {
          this.CPFValidationMsg =
            'Informe um número de CPF para realizar a busca';
        } else if (!isValidCPF(cpf)) {
          this.CPFValidationMsg = 'CPF inválido: número inexistente';
        } else {
          this.CPFValidationMsg = 'Aguarde, procurando CPF...';
          api.get(`applications?cpf=${cpf}`).then(({ data }) => {
            if (data.data.length !== 0) {
              this.application = data.data[0];
              const birthday = data.data[0].citizen.birthday;
              if (birthday) {
                this.application.citizen.birthday = formatDate2(birthday);
              }
              this.CPFValidationMsg = '';
            } else {
              this.CPFValidationMsg = 'Esse CPF não consta em nossa base';
            }
          });
        }
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
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }
</style>
