<template>
  <section>
    <v-card width="400">
      <v-card-title class="light-blue darken-4 white--text mt-8">
        <v-icon color="white">fa-laptop</v-icon>
        <p class="ml-3">
          Vacinações digitadas por {{ this.$store.state.user.name }}
        </p>
      </v-card-title>

      <v-card-text>
        <h3>Buscar vacinações de datas anteriores</h3>
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
        ></v-text-field>
        <div class="font-weight-bold ml-8 mb-2">
          Hoje
        </div>

        <v-timeline align-top dense>
          <v-timeline-item
            v-for="userApplication in userApplications"
            :key="userApplication.id"
            :color="
              userApplication.dose === 1 ? 'deep-purple lighten-1' : 'green'
            "
            small
          >
            <div class="timeline-content">
              <div>
                <div class="font-weight-normal">
                  <strong>{{ userApplication.citizen.name }}</strong>
                </div>
                <div>CPF: {{ userApplication.citizen.cpf }}</div>
              </div>
              <a @click.prevent="$emit('onEdit', userApplication)">
                <v-icon>
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
</style>
