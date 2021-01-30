<template>
  <v-container>
    <v-form>
      <div v-if="type === 'edit'" class="fields-container">
        <h3>Clique em buscar para carregar os dados</h3>
        <v-text-field
          label="CPF"
          v-model="application.citizen.cpf"
          counter="11"
          append-icon="mdi-alert-circle"
          :hint="CPFValidationMsg || 'Somente números'"
          :persistent-hint="!!CPFValidationMsg || false"
          inputmode="numeric"
        ></v-text-field>
        <button @click.prevent="$emit('findCPF')" class="btn">Buscar</button>
      </div>
      <div class="fields-container">
        <h3>Dados do cidadão</h3>
        <v-text-field
          label="CPF"
          v-if="type === 'create'"
          v-model="application.citizen.cpf"
          counter="11"
          append-outer-icon="mdi-alert-circle"
          :hint="CPFValidationMsg || 'Somente números'"
          :persistent-hint="!!CPFValidationMsg || false"
          inputmode="numeric"
          @blur="$emit('validateCPF')"
        ></v-text-field>
        <v-text-field
          label="Nome"
          v-model.trim="application.citizen.name"
          counter="45"
          append-outer-icon="mdi-alert-circle"
          hint="O nome deve ter no mínimo 9 caracteres"
        ></v-text-field>
        <v-select
          label="Grupo prioritário"
          v-model="application.category_id"
          :items="categories"
          item-text="name"
          item-value="id"
          append-outer-icon="mdi-alert-circle"
        ></v-select>
        <v-select
          label="Grupo de atendimento"
          v-model="application.servicegroup_id"
          :items="filteredServicegroups"
          item-text="name"
          item-value="id"
          append-outer-icon="mdi-alert-circle"
        ></v-select>
        <v-text-field
          label="Data de nascimento"
          v-model="application.citizen.birthday"
          v-mask="'XX/XX/XXXX'"
          hint="somente números"
          inputmode="numeric"
        ></v-text-field>
        <v-text-field
          label="CNS"
          hint="Somente números"
          v-model.trim="application.citizen.cns"
          counter="15"
          inputmode="numeric"
        ></v-text-field>
      </div>
      <div class="fields-container">
        <h3>Dados da vacina</h3>
        <v-select
          label="Local"
          v-model="application.location_id"
          :items="locations"
          item-text="name"
          item-value="id"
          append-outer-icon="mdi-alert-circle"
        ></v-select>
        <v-autocomplete
          label="Vacinador"
          v-model="application.vaccinator_id"
          :items="vaccinators"
          item-text="name"
          item-value="id"
          append-outer-icon="mdi-alert-circle"
        ></v-autocomplete>
        <v-select
          label="Lote"
          v-model="application.lot_id"
          :items="lots"
          item-value="id"
          append-outer-icon="mdi-alert-circle"
        >
          <template v-slot:selection="{ item }">
            {{ item.name }}
          </template>
          <template v-slot:item="{ item }">
            {{ item.immunobiological.name }} - {{ item.name }}
          </template>
        </v-select>
        <v-text-field
          label="Data de vacinação"
          v-model="application.application_date"
          type="date"
          min="2021-01-19"
          :max="today"
          append-outer-icon="mdi-alert-circle"
        >
        </v-text-field>
      </div>
      <div class="validation-errors" v-if="errors.length">
        <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
        <ol>
          <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
        </ol>
      </div>
      <slot> </slot>
    </v-form>
  </v-container>
</template>

<script>
  import { currentDate } from '../helper';
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
    data() {
      return {
        today: currentDate(),
        locations: [],
        categories: [],
        servicegroups: [],
        lots: [],
        vaccinators: [],
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
    },
    methods: {
      isDataValidated() {
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
            value: this.application.servicegroup_id,
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
        this.application.lot_id = '';
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
    },
    created() {
      this.fetchVaccinators();
      this.fetchLocations();
      this.fetchCategories();
      this.fetchServicegroups();
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
    padding: 15px 30px;
  }
  .fields-container:not(:first-child) {
    margin-top: 40px;
  }
  .v-input {
    width: 70%;
  }
</style>
