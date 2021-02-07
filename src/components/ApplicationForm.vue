<template>
  <v-container>
    <v-form
      ref="applicationForm"
      v-model="valid"
      @submit.prevent="handleSubmit()"
    >
      <v-card width="600" class="mx-auto">
        <v-card-title class="white--text pa-5 card-title">
          <v-icon color="white">fa-user</v-icon>
          <p class="ml-3 mb-0 ">
            Dados do cidadão
          </p>
        </v-card-title>

        <v-card-text class="pa-8">
          <v-text-field
            label="CPF"
            :disabled="type === 'edit'"
            v-model="application.citizen.cpf"
            v-mask="'###########'"
            append-icon="mdi-alert-circle"
            :hint="CPFValidationMsg || 'Somente números'"
            :persistent-hint="!!CPFValidationMsg || false"
            inputmode="numeric"
            clearable
            outlined
            @blur="validateCPF()"
            :rules="validators.cpf"
            class="mb-4"
          ></v-text-field>
          <v-text-field
            label="Nome"
            v-model.trim="application.citizen.name"
            counter="45"
            clearable
            append-icon="mdi-alert-circle"
            outlined
            :rules="validators.name"
            class="mb-4"
          ></v-text-field>
          <v-select
            label="Grupo prioritário"
            v-model="application.category_id"
            :items="categories"
            item-text="name"
            item-value="id"
            no-data-text="Carregando..."
            append-icon="mdi-alert-circle"
            :rules="validators.categories"
            outlined
            class="mb-4"
          ></v-select>
          <v-select
            label="Grupo de atendimento"
            v-model="application.servicegroup_id"
            :items="filteredServicegroups"
            item-text="name"
            item-value="id"
            no-data-text="Carregando..."
            append-icon="mdi-alert-circle"
            :rules="validators.servicegroups"
            outlined
            class="mb-4"
          ></v-select>
          <v-text-field
            label="Data de nascimento"
            v-model="application.citizen.birthday"
            v-mask="'XX/XX/XXXX'"
            clearable
            hint="somente números"
            inputmode="numeric"
            :rules="validators.birthday"
            outlined
            class="mb-4"
          ></v-text-field>
          <v-text-field
            label="CNS"
            hint="Somente números"
            v-mask="'###############'"
            clearable
            v-model.trim="application.citizen.cns"
            inputmode="numeric"
            :rules="validators.cns"
            outlined
            class="mb-2"
          ></v-text-field>
        </v-card-text>

        <v-card-title class="white--text card-title pa-5">
          <v-icon color="white">fa-syringe</v-icon>
          <p class="ml-3 mb-0">
            Dados da vacina
          </p>
        </v-card-title>
        <v-card-text class="pa-8">
          <v-select
            label="Dose"
            v-model="application.dose"
            :rules="validators.dose"
            outlined
            :items="[
              { text: 1, value: 1 },
              { text: 2, value: 2 },
            ]"
            disabled
            append-icon="mdi-alert-circle"
            class="mb-4"
          ></v-select>
          <v-select
            label="Local"
            v-model="application.location_id"
            :items="locations"
            item-text="name"
            item-value="id"
            no-data-text="Carregando..."
            append-icon="mdi-alert-circle"
            :rules="validators.location"
            outlined
            class="mb-4"
          ></v-select>
          <v-autocomplete
            label="Vacinador"
            v-model="application.vaccinator_id"
            :items="vaccinators"
            item-text="name"
            item-value="id"
            no-data-text="Carregando..."
            append-icon="mdi-alert-circle"
            :rules="validators.vaccinator"
            outlined
            class="mb-4"
          ></v-autocomplete>
          <v-select
            label="Lote"
            v-model="application.lot_id"
            :items="lots"
            item-value="id"
            no-data-text="Carregando..."
            append-icon="mdi-alert-circle"
            :rules="validators.lot"
            outlined
            class="mb-4"
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
            append-icon="mdi-alert-circle"
            :rules="validators.application_date"
            outlined
            class="mb-4"
          >
          </v-text-field>
          <v-btn class="white--text btn" elevation="2" type="submit">
            {{ type === 'create' ? 'Cadastrar' : 'Editar' }}
          </v-btn>
          <v-btn v-if="type === 'edit'" @click="handleCancel()" elevation="2">
            Cancelar
          </v-btn>
          <div class="message">
            {{ message }}
          </div>
        </v-card-text>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
  import { currentDate, formatDate1, formatDate2 } from '../helpers/utils';
  import { api } from '../services';
  import { Validator as v } from '../helpers/validators';
  import Swal from 'sweetalert2';
  export default {
    name: 'ApplicationForm',
    props: ['type', 'application'],
    data() {
      return {
        valid: null,
        message: '',
        CPFValidationMsg: '',
        checkedCPF: false,
        today: currentDate(),
        locations: [],
        categories: [],
        servicegroups: [],
        lots: [],
        vaccinators: [],
        errors: [],
        validators: {
          cpf: [v.required(), v.len(11), v.validateCPF()],
          name: [v.required(), v.min(9), v.max(45)],
          categories: [v.required()],
          servicegroups: [v.required()],
          birthday: [v.len(10)],
          cns: [v.len(15)],
          location: [v.required()],
          vaccinator: [v.required()],
          lot: [v.required()],
          application_date: [v.required()],
          dose: [v.required()],
        },
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
      handleSubmit() {
        this.$refs.applicationForm.validate();
        if (!this.valid) {
          return (this.message = 'Por favor, preencha os dados corretamente!');
        }

        this.message = 'Enviando dados...';

        const birthday = this.application.citizen.birthday;
        if (birthday) {
          this.application.citizen.birthday = formatDate1(birthday);
        }

        if (this.type === 'create') {
          this.registerApplication();
        } else if (this.type === 'edit') {
          this.editApplication();
        }
      },
      handleCancel() {
        this.$refs.applicationForm.reset();
        this.$emit('changeType', 'create');
      },
      registerApplication() {
        if (!this.checkedCPF) {
          return (this.message = 'Por favor, aguarde a validação do CPF!');
        }
        this.application.user_id = localStorage.getItem('user_id');
        api
          .post('/applications', this.application)
          .then(() => {
            this.$store.dispatch('addUserApplication', this.application);
            this.message = '';
            this.CPFValidationMsg = '';
            this.clearForm();
            this.$refs.applicationForm.resetValidation();
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
      editApplication() {
        this.application.updated_by = localStorage.getItem('user_id');
        api
          .put(`/applications/${this.application.id}`, this.application)
          .then(() => {
            this.message = '';
            this.$refs.applicationForm.reset();
            this.$emit('changeType', 'create');
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
      validateCPF() {
        const cpf = this.application.citizen.cpf;
        if (cpf) {
          this.CPFValidationMsg = 'Verificando CPF...';
          api
            .get(`/applications?cpf=${cpf}`)
            .then(({ data }) => {
              if (data.data.length > 1) {
                const dose1 = formatDate2(data.data[1].application_date);
                const dose2 = formatDate2(data.data[0].application_date);
                this.CPFValidationMsg = `O portador deste CPF já recebeu as duas doses.
                1ª dose: ${dose1}
                2ª dose: ${dose2}`;
              } else {
                this.checkedCPF = true;
                if (data.data.length === 1) {
                  this.application.dose = 2;
                  this.CPFValidationMsg = 'CPF apto para receber a 2ª dose!';
                } else {
                  this.application.dose = 1;
                  this.CPFValidationMsg = 'CPF apto para receber a 1ª dose!';
                }
              }
            })
            .catch(() => {
              this.CPFValidationMsg =
                'Não foi possível consultar o CPF. Favor recarregar a página e tentar novamente.';
            });
        }
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
  .card-title {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #aa4465;
  }
  .btn {
    background-color: #af7b48e1 !important;
  }
</style>
