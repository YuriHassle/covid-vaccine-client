<template>
  <section>
    <v-card width="600" class="mx-auto mt-8 mb-8">
      <v-card-title class="white--text pa-5 card-title">
        <v-icon color="white">fa-laptop</v-icon>
        <p class="ml-3 mb-0">
          Vacinações digitadas por {{ this.$store.state.user.name }}
        </p>
      </v-card-title>

      <v-card-text class="pa-8">
        <h3>Buscar vacinações de datas anteriores:</h3>
        <v-text-field
          label="CPF"
          v-model="cpf"
          append-icon="mdi-send"
          clearable
          @click:append="$emit('findCPF', cpf)"
          v-mask="'###########'"
          :hint="searchCPFMsg || 'Somente números'"
          :persistent-hint="!!searchCPFMsg || false"
          inputmode="numeric"
          :rules="validators.cpf"
          outlined
          class="mb-4"
        ></v-text-field>
        <div class="font-weight-bold ml-8 mb-2">
          Hoje
        </div>

        <v-timeline align-top dense>
          <v-timeline-item
            v-for="userApplication in userApplications"
            :key="userApplication.id"
            :color="userApplication.dose === 1 ? '#CEB8A1' : '#6862A7'"
            small
          >
            <div class="timeline-content">
              <div>
                <div class="font-weight-normal">
                  <strong>{{ userApplication.citizen.name }}</strong>
                </div>
                <div>CPF: {{ userApplication.citizen.cpf }}</div>
                <div>Dose: {{ userApplication.dose }}</div>
              </div>
              <a @click.prevent="$emit('onEdit', userApplication)">
                <v-icon class="ml-7">
                  far fa-edit
                </v-icon>
              </a>
            </div>
          </v-timeline-item>
        </v-timeline>
      </v-card-text>
    </v-card>
  </section>
</template>

<script>
  import { Validator as v } from '../helpers/validators';
  export default {
    props: ['searchCPFMsg'],
    data: () => ({
      cpf: '',
      validators: {
        cpf: [v.required(), v.len(11), v.validateCPF()],
      },
    }),
    computed: {
      userApplications() {
        return this.$store.state.user_applications;
      },
    },
    mounted() {
      this.$store.dispatch('getUserApplications');
    },
  };
</script>

<style scoped>
  .timeline-content {
    display: flex;
    align-items: center;
  }
  .card-title {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #aa4465;
  }
  h3 {
    margin-bottom: 10px;
  }
</style>
