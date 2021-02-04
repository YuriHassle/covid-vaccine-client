<template>
  <section class="container">
    <div class="btn-container">
      <button class="btn btn-secondary" @click.prevent="logout">
        Deslogar
      </button>
      <button
        class="btn btn-secondary"
        @click.prevent="$router.push({ name: 'updatepassword' })"
      >
        Trocar Senha
      </button>
      <button
        class="btn btn-secondary"
        @click.prevent="$router.push({ name: 'updateuserdata' })"
      >
        Atualizar Dados
      </button>
    </div>
    <button class="btn" @click.prevent="edit">Editar</button>
    <ApplicationForm
      type="create"
      :application="application"
      :CPFValidationMsg="CPFValidationMsg"
      :checkedCPF="checkedCPF"
      ref="applicationForm"
      @validateCPF="validateCPF()"
    >
      <button class="btn" @click.prevent="saveApplication">
        Salvar
      </button>
    </ApplicationForm>
    <div class="message">
      {{ message }}
    </div>
  </section>
</template>
<script>
  import { api } from '../services';
  import { isValidCPF, formatDate1, formatDate2 } from '../helper';
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
        dose: '',
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
      saveApplication() {
        if (!this.$refs.applicationForm.isDataValidated()) return;
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
            this.$refs.applicationForm.clearForm();
            Swal.fire({
              icon: 'success',
              title: 'Cadastrado com êxito',
              text: 'Os dados registrados com sucesso!',
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch(() => {
            this.message = '';
            Swal.fire({
              icon: 'error',
              title: 'Erro ao cadastrar',
              text: 'Ocorreu algum erro. Por favor, tente novamente.',
              showConfirmButton: false,
              timer: 2000,
            });
          });
      },
      validateCPF() {
        const cpf = this.application.citizen.cpf;
        if (cpf.length === 0) {
          this.CPFValidationMsg = 'O campo CPF é obrigatório';
        } else {
          this.CPFValidationMsg = 'Verificando CPF...';
          if (!isValidCPF(cpf)) {
            this.CPFValidationMsg = 'CPF inválido: número inexistente';
          } else {
            api
              .get(`/applications?cpf=${cpf}`)
              .then(({ data }) => {
                if (data.data.length !== 0) {
                  const formattedDate = formatDate2(
                    data.data[0].application_date
                  );
                  this.CPFValidationMsg = `CPF inválido: o portador do CPF ${cpf} já foi vacinado em ${formattedDate}`;
                } else {
                  this.checkedCPF = true;
                  this.CPFValidationMsg = 'CPF válido!';
                }
              })
              .catch(() => {
                this.CPFValidationMsg =
                  'Não foi possível consultar o CPF. Favor recarregar a página e tentar novamente.';
              });
          }
        }
      },
      logout() {
        this.$store.dispatch('logout');
        this.$router.push({ name: 'login' });
      },
      edit() {
        this.$router.push({ name: 'edit' });
      },
    },
  };
</script>

<style scoped lang="scss">
  .btn {
    margin: auto;
    margin: 20px 10px 10px 10px;
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .btn-secondary {
    background-color: rgb(150, 184, 141);
  }
  .btn-container {
    display: flex;
  }
</style>
