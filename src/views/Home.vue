<template>
  <section>
    <button class="btn" @click.prevent="logout">Deslogar</button>
    <form>
      <div class="fields-container">
        <h3>Dados do cidadão</h3>
        <FormField label="CPF" :required="true" name="cpf">
          <input
            type="text"
            name="cpf"
            v-model="application.citizen.cpf"
            minlength="11"
            maxlength="11"
            pattern="[0-9]*"
            inputmode="numeric"
            placeholder="somente números"
            @focusout="validateCPF()"
          />
          <div v-if="CPFValidationMsg" class="message">
            {{ CPFValidationMsg }}
          </div>
        </FormField>
        <FormField label="CNS" name="cns">
          <input
            type="text"
            name="cns"
            v-model="application.citizen.cns"
            minlength="15"
            maxlength="15"
            pattern="[0-9]*"
            inputmode="numeric"
            placeholder="somente números"
          />
        </FormField>
        <FormField label="Nome" :required="true" name="name">
          <input
            type="text"
            name="name"
            v-model="application.citizen.name"
            minlength="9"
            maxlength="45"
          />
        </FormField>
        <FormField label="Data de Nascimento" name="birthday">
          <input
            type="text"
            name="birthday"
            placeholder="somente números"
            v-mask="'XX/XX/XXXX'"
            pattern="[0-9]*"
            inputmode="numeric"
            v-model="application.citizen.birthday"
          />
        </FormField>
        <FormField label="Grupo prioritário" :required="true" name="category">
          <select
            class="select-form"
            v-model="application.category_id"
            name="category"
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
        </FormField>
        <FormField
          label="Grupo de atendimento"
          :required="true"
          name="service-group"
        >
          <select
            class="select-form"
            v-model="application.servicegroup_id"
            name="service-group"
          >
            <option
              v-for="servicegroup in filteredServicegroups"
              :key="servicegroup.id"
              :value="servicegroup.id"
            >
              {{ servicegroup.name }}
            </option>
          </select>
        </FormField>
      </div>
      <div class="fields-container">
        <h3>Dados da vacina</h3>
        <FormField label="Local" :required="true" name="location">
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
        </FormField>
        <FormField label="Vacinador" :required="true" name="vaccinator">
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
            </option>
          </select>
        </FormField>
        <FormField label="Lote" :required="true" name="lot">
          <select class="select-form" name="lot" v-model="application.lot_id">
            <option v-for="lot in lots" :key="lot.id" :value="lot.id">
              {{ lot.name }}
            </option>
          </select>
        </FormField>
        <FormField
          label="Data de vacinação"
          :required="true"
          name="application-date"
        >
          <input
            type="date"
            name="application-date"
            min="2021-01-19"
            :max="today"
            v-model="application.application_date"
          />
        </FormField>
      </div>
      <div style="margin-bottom: 1.5rem">
        <button class="btn" @click.prevent="saveApplication">
          Salvar
        </button>
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
    </form>
  </section>
</template>
<script>
  import { api } from '../services';
  import { isValidCPF, currentDate, formatDate1, formatDate2 } from '../helper';
  import Swal from 'sweetalert2';
  import FormField from '../components/FormField';

  export default {
    name: 'Home',
    components: { FormField },
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

        const name = this.application.citizen.name;
        if (name.length < 9 && name !== '') {
          this.errors.push('Informe um nome com no mínimo 9 caracteres');
        }

        const cns = this.application.citizen.cns;
        if (cns.length !== 15 && cns !== '') {
          this.errors.push('Informe um CNS com 15 caracteres');
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
            this.CPFValidationMsg = 'CPF inválido: número inexistente';
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

<style scoped lang="scss">
  form {
    padding: 10px 20px;
    max-width: 100vw;
    min-width: 60vw;
  }
  h3 {
    padding-top: 20px;
    padding-left: 20px;
  }
  .validation-errors {
    padding-top: 20px;
    padding-bottom: 5px;
  }
  .validation-errors li {
    padding-top: 5px;
    color: red;
  }
  .fields-container {
    display: flex;
    flex-direction: column;
    background-color: rgba(237, 244, 245, 0.972);
  }
  .fields-container:first-child {
    margin-bottom: 40px;
  }
  .btn {
    margin: auto;
    margin-top: 20px;
    margin-bottom: 10px;
  }
</style>
