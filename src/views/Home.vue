<template>
  <div class="entire-div">
    <div class="form">
      <button class="logout" @click.prevent="logout">Deslogar</button>
      <div class="box-form">
        <label for="location">Sala de vacina (local) <span>*</span></label>
        <br />
        <select
          class="select-form"
          name="location"
          v-model="application.location_id"
        >
          <option
            v-for="location in locations"
            :key="location.id"
            :value="location.id"
          >
            {{ location.name }}
          </option>
        </select>
        <br />
      </div>
      <div class="box-form">
        <label for="cpf">CPF do cidadão <span>*</span></label
        ><br />
        <input
          type="number"
          name="cpf"
          v-model="application.citizen.cpf"
          v-mask="'###########'"
          placeholder="somente números"
          @focusout="validateCPF()"
        />
        <div class="message">
          {{ CPFValidationMsg }}
        </div>
        <br />
      </div>
      <div class="box-form">
        <label for="cns">CNS do cidadão</label><br />
        <input
          type="number"
          name="cns"
          v-model="application.citizen.cns"
          v-mask="'XXXXXXXXXXXXXXX'"
          placeholder="somente números"
        />
        <br />
      </div>
      <div class="box-form">
        <label for="nome">Nome do cidadão <span>*</span></label
        ><br />
        <input
          type="text"
          name="nome"
          v-model="application.citizen.name"
          v-mask="'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'"
        />
        <br />
      </div>
      <div class="box-form">
        <label for="dt_vacinacao">Data de nascimento do cidadão</label><br />
        <input
          type="text"
          name="bithday"
          placeholder="somente números"
          v-mask="'XX/XX/XXXX'"
          v-model="application.citizen.birthday"
        />
        <br />
      </div>
      <div class="box-form">
        <label for="lot">Lote <span>*</span></label> <br />
        <select class="select-form" name="lot" v-model="application.lot_id">
          <option v-for="lot in lots" :key="lot.id" :value="lot.id">
            {{ lot.name }}
          </option>
        </select>
        <br />
      </div>
      <div class="box-form">
        <label for="vaccinator">Vacinador <span>*</span></label
        ><br />
        <select
          class="select-form"
          name="vaccinator"
          v-model="application.vaccinator_id"
        >
          <option
            v-for="vaccinator in vaccinators"
            :value="vaccinator.id"
            :key="vaccinator.id"
          >
            {{ vaccinator.name }}
          </option></select
        ><br />
      </div>

      <div class="box-form">
        <label for="dt_vacinacao">Data da vacinação <span>*</span></label
        ><br />
        <input
          type="date"
          name="dt_vacinacao"
          min="2021-01-19"
          :max="today"
          v-model="application.application_date"
        />
        <br />
      </div>
      <div class="box-form">
        <label for="grupo_prioriario">Grupo prioritário <span>*</span></label>
        <br />
        <select
          class="select-form"
          v-model="application.category_id"
          name="grupo_prioritario"
          @change="selectServiceGroup()"
        >
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
        <br />
      </div>
      <div class="box-form">
        <label for="grupo_atendimento"
          >Grupo de atendimento <span>*</span></label
        >
        <br />
        <select
          class="select-form"
          v-model="application.servicegroup_id"
          name="grupo_atendimento"
        >
          <option
            v-for="servicegroup in filteredServicegroups"
            :key="servicegroup.id"
            :value="servicegroup.id"
          >
            {{ servicegroup.name }}
          </option>
        </select>
        <br />
      </div>
      <br />
      <div style="margin-bottom: 1.5rem">
        <button class="button save" @click.prevent="saveApplication">
          SALVAR
        </button>
        <br />
        <div class="validation-errors" v-if="errors.length">
          <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
          <ol>
            <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
          </ol>
        </div>
        <div class="message">
          {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { api } from '../services';
  import { isValidCPF, currentDate, formatDate1, formatDate2 } from '../helper';
  import Swal from 'sweetalert2';

  export default {
    name: 'Home',
    components: {},
    data: () => ({
      today: currentDate(),
      CPFValidationMsg: '',
      checkedCPF: false,
      application: {
        location_id: '',
        lot_id: '',
        category_id: '',
        servicegroup_id: '',
        vaccinator_id: '',
        application_date: currentDate(),
        dose: 1,
        citizen: {
          cpf: '',
          cns: '',
          name: '',
          birthday: ''
        }
      },
      locations: null,
      categories: null,
      servicegroups: null,
      filteredServicegroups: null,
      lots: null,
      vaccinators: null,
      message: null,
      errors: []
    }),
    methods: {
      saveApplication() {
        if (!this.isValidData()) return;
        this.message = 'Enviando dados...';

        const birthday = this.application.citizen.birthday;
        if (birthday) {
          this.application.citizen.birthday = formatDate1(birthday);
        }

        api
          .post('/applications', this.application)
          .then(() => {
            this.message = '';
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
            Swal.fire({
              icon: 'error',
              title: 'Erro ao cadastrar',
              text: 'Ocorreu algum erro. Por favor, tente novamente.',
              showConfirmButton: false,
              timer: 2000
            });
          });
      },
      isValidData() {
        this.errors = [];

        const requiredFields = [
          { name: "'sala de vacina'", value: this.application.location_id },
          { name: "'CPF do cidadão'", value: this.application.citizen.cpf },
          { name: "'nome do cidadão'", value: this.application.citizen.name },
          { name: "'lote'", value: this.application.lot_id },
          { name: "'vacinador'", value: this.application.vaccinator_id },
          { name: "'grupo prioritário'", value: this.application.category_id },
          {
            name: "'grupo de atendimento'",
            value: this.application.servicegroup_id
          }
        ];

        for (const field of requiredFields) {
          if (!field.value) {
            this.errors.push(`Preencha o campo ${field.name}`);
          }
        }

        if (!this.checkedCPF) {
          this.errors.push('Verifique a validade do CPF informado');
        }

        const birthday = this.application.citizen.birthday;

        if (birthday.length !== 10 && birthday !== '') {
          this.errors.push('Informe um data de nascimento válida');
        }

        return this.errors.length ? false : true;
      },
      selectServiceGroup() {
        if (this.servicegroups) {
          this.filteredServicegroups = this.servicegroups.filter(
            serviceGroup => {
              return serviceGroup.category_id === this.application.category_id;
            }
          );
        }
      },
      logout() {
        localStorage.removeItem('token');
        this.$router.push('/login');
      },
      clearForm() {
        this.application.lot_id = '';
        this.application.category_id = '';
        this.application.servicegroup_id = '';
        this.application.citizen.cpf = '';
        this.application.citizen.cns = '';
        this.application.citizen.name = '';
        this.application.citizen.birthday = '';
      },
      fetchVaccinators() {
        api.get('/vaccinators').then(({ data }) => {
          this.vaccinators = data.data;
        });
      },
      fetchLocations() {
        api.get('/locations').then(({ data }) => {
          this.locations = data.data;
        });
      },
      fetchCategories() {
        api.get('/categories').then(({ data }) => {
          this.categories = data.data;
        });
      },
      fetchServicegroups() {
        api.get('/servicegroups').then(({ data }) => {
          this.servicegroups = data.data;
        });
      },
      fetchLots() {
        api.get('/lots').then(({ data }) => {
          this.lots = data.data;
        });
      },
      validateCPF() {
        const cpf = this.application.citizen.cpf;
        if (cpf.length !== 0) {
          this.CPFValidationMsg = 'Verificando CPF...';

          if (!isValidCPF(cpf)) {
            this.CPFValidationMsg = 'CPF inválido: número de CPF inexistente';
          } else {
            api.get(`/applications?cpf=${cpf}`).then(({ data }) => {
              if (data.data.length !== 0) {
                const formattedDate = formatDate2(
                  data.data[0].application_date
                );
                this.CPFValidationMsg = `CPF inválido: o portador do CPF ${cpf} já foi vacinado em ${formattedDate}`;
              } else {
                this.checkedCPF = true;
                this.CPFValidationMsg = 'CPF válido!';
              }
            });
          }
        } else {
          this.CPFValidationMsg = 'O campo CPF é obrigatório';
        }
      }
    },
    created() {
      this.fetchVaccinators();
      this.fetchLocations();
      this.fetchCategories();
      this.fetchServicegroups();
      this.fetchLots();
    }
  };
</script>

<style lang="scss">
  input,
  select {
    padding: 0.1rem 0.3rem 0.2rem;
    border: 1px solid black !important;
    outline: black;
    margin: 0.4rem 0rem 0.4rem 0rem;
    min-width: 320px;
  }
  input {
    border-radius: 0.2rem !important;
  }

  select {
    padding: 0.4rem 0.4rem 0.5rem;
    border-radius: 0.4rem;
    background-color: white !important;
    -webkit-appearance: menulist !important; /* override vuetify style */
    -moze-appearance: menulist !important; /* override vuetify style */
    appearance: menulist !important; /* override vuetify style */
  }
  label,
  option {
    font-family: 'Open Sans', sans-serif;
    font-size: 1em;
  }
  .header {
    display: flex;
    padding: 1rem;
    background-color: #005346;
    justify-content: center;
  }
  .copyright {
    background-color: #005346;
    p {
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 0px !important;
    }
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .footer {
    background-color: #005346;
    color: #f5f5f5;
    row-gap: 3;
    padding: 15px 10px 10px 5px;
  }
  .footer-container {
    display: flex;
  }
  .footer-text-header {
    padding-top: 1rem;
    padding-bottom: 1rem;
    margin-bottom: 0px !important;
    font-weight: bold;
    font-size: 1.2em;
  }
  a {
    text-decoration: none;
    color: #f5f5f5 !important;
  }
  .text-header {
    background-color: #005346;
    p {
      font-family: 'Roboto', sans-serif;
      font-weight: bold;
      font-size: 2em;
      text-align: center;
      padding: 1rem 2rem;
      color: snow;
    }
  }
  .v-application--wrap {
    background-color: #fff !important;
  }
  .btn-submit {
    padding: 0.2rem 1rem !important;
    border-radius: 0.4rem;
    background-color: white;
    color: rgb(0, 150, 136) !important;
    border: none !important;
    margin-top: 1rem;
  }
  .box-form {
    background-color: rgba(230, 236, 238, 0.52);
    margin: 1rem 0rem 1rem 0rem;
    border-radius: 0.2rem;
    // filter: drop-shadow(2px 2px 2px black);
    padding: 0.4rem 4rem 0.4rem 1rem;
  }
  .button {
    border: 1px solid black;
    padding: 0.2rem 2rem;
    border-radius: 0.4rem;
    color: #009aa0;
  }
  .save {
    background-color: snow;
    outline: none;
  }
  .clean {
    background-color: transparent;
    border: none;
  }

  button:hover {
    transform: translate(0px, -1px);
    box-shadow: 0px 1px 10px 0px #00000011;
    transition: transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out;
  }

  button:active {
    outline: none;
    transform: translate(0px, 1px);
    transition: transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out;
  }

  .form {
    padding-left: 2rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .validation-errors {
    padding-top: 20px;
    padding-bottom: 5px;
  }
  .validation-errors li {
    padding-top: 5px;
    color: red;
  }
  span {
    color: red;
    font-size: 1.1rem;
  }
  .message {
    padding-top: 10px;
    padding-bottom: 10px;
    font-weight: bold;
    font-size: 1.1rem;
  }
</style>
