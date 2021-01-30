<template>
  <form>
    <div v-if="type === 'edit'" class="fields-container">
      <h3>Clique em buscar para carregar os dados</h3>
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
        />
        <div v-if="CPFValidationMsg" class="message">
          {{ CPFValidationMsg }}
        </div>
        <button @click.prevent="$emit('findCPF')" class="btn">Buscar</button>
      </FormField>
    </div>
    <div class="fields-container">
      <h3>Dados do cidadão</h3>
      <FormField
        v-if="type === 'create'"
        label="CPF"
        :required="true"
        name="cpf"
      >
        <input
          type="text"
          name="cpf"
          v-model="application.citizen.cpf"
          minlength="11"
          maxlength="11"
          pattern="[0-9]*"
          inputmode="numeric"
          placeholder="somente números"
          @focusout="$emit('validateCPF')"
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
          v-model.trim="application.citizen.name"
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
          inputmode="numeric"
          v-model="application.citizen.birthday"
        />
      </FormField>
      <FormField label="Grupo prioritário" :required="true" name="category">
        <select
          class="select-form"
          v-model="application.category_id"
          name="category"
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
      <FormField label="Imunobiológico" :required="true" name="imuno">
        <select
          class="select-form"
          name="imuno"
          v-model="application.immuno_id"
        >
          <option v-for="imb in immunos" :key="imb.id" :value="imb.id">
            {{ imb.name }}
          </option>
        </select>
      </FormField>
      <FormField label="Lote" :required="true" name="lot">
        <select class="select-form" name="lot" v-model="application.lot_id">
          <option v-for="lot in filteredLots" :key="lot.id" :value="lot.id">
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
    <div class="validation-errors" v-if="errors.length">
      <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
      <ol>
        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
      </ol>
    </div>
    <slot> </slot>
  </form>
</template>

<script>
  import { currentDate } from '../helper';
  import FormField from './FormField';
  import { api } from '../services';
  export default {
    name: 'ApplicationForm',
    props: [
      'type',
      'application',
      'isValidData',
      'CPFValidationMsg',
      'checkedCPF',
    ],
    components: {
      FormField,
    },
    data() {
      return {
        today: currentDate(),
        locations: null,
        categories: null,
        servicegroups: null,
        lots: null,
        immunos: null,
        vaccinators: null,
        errors: [],
      };
    },
    computed: {
      filteredServicegroups() {
        if (this.servicegroups) {
          return this.servicegroups.filter(
            serviceGroup =>
              serviceGroup.category_id === this.application.category_id
          );
        } else return [];
      },

      filteredLots() {
        if (this.lots) {
          return this.lots.filter(
            lot => lot.immunobiologicals_id === this.application.immuno_id
          );
        } else return [];
      },
    },
    methods: {
      isDataValidated() {
        this.errors = [];

        const requiredFields = [
          { name: "'sala de vacina'", value: this.application.location_id },
          { name: "'CPF do cidadão'", value: this.application.citizen.cpf },
          { name: "'nome do cidadão'", value: this.application.citizen.name },
          { name: "'Imunobiológico'", value: this.application.immuno_id },
          { name: "'lote'", value: this.application.lot_id },
          { name: "'vacinador'", value: this.application.vaccinator_id },
          { name: "'grupo prioritário'", value: this.application.category_id },
          {
            name: "'grupo de atendimento'",
            value: this.application.servicegroup_id,
          },
          {
            name: "'data de vacinação'",
            value: this.application.application_date,
          },
        ];

        for (const field of requiredFields) {
          if (!field.value) {
            this.errors.push(`Preencha o campo ${field.name}`);
          }
        }

        if (this.type === 'create' && !this.checkedCPF) {
          this.errors.push('Verifique a validade do CPF informado');
        }

        const birthday = this.application.citizen.birthday;
        if (birthday && birthday.length !== 10 && birthday !== '') {
          this.errors.push('Informe um data de nascimento válida');
        }

        const name = this.application.citizen.name;
        if (name.length < 9 && name !== '') {
          this.errors.push('Informe um nome com no mínimo 9 caracteres');
        }

        const cns = this.application.citizen.cns;
        if (cns && cns.length !== 15 && cns !== '') {
          this.errors.push('Informe um CNS com 15 caracteres');
        }

        return this.errors.length ? false : true;
      },
      clearForm() {
        this.application.immuno_id = '';
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
      fetchImmunos() {
        api.get('/immunos').then(({ data }) => {
          this.immunos = data.data;
        });
      },
      fetchLots() {
        api.get('/lots').then(({ data }) => {
          this.lots = data.data;
        });
      },
    },
    created() {
      this.fetchVaccinators();
      this.fetchLocations();
      this.fetchCategories();
      this.fetchServicegroups();
      this.fetchImmunos();
      this.fetchLots();
    },
  };
</script>

<style scoped>
  form {
    padding: 10px 20px;
    max-width: 100vw;
    min-width: 60vw;
  }
  h3 {
    padding-top: 20px;
    padding-left: 20px;
    margin-bottom: 15px;
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
  .fields-container:not(:first-child) {
    margin-top: 40px;
  }
</style>
