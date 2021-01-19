<template>
  <div class="entire-div">
    <div class="text-header">
      <p>Vacinação COVID-19, SEMSA MANAUS</p>
    </div>
    <div class="form">
      <label for="location">Sala (Local)</label> <br />
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
      <label for="cpf">CPF do cidadão</label><br />
      <input
        type="text"
        name="cpf"
        v-model="application.citizen.cpf"
        v-mask="'###########'"
      />
      <br />

      <label for="cns">CNS do cidadão</label><br />
      <input
        type="text"
        name="cns"
        v-model="application.citizen.cns"
        v-mask="'XXXXXXXXXXXXXXX'"
      />
      <br />

      <label for="nome">Nome do cidadão</label><br />
      <input type="text" name="nome" v-model="application.citizen.name" />
      <br />

      <label for="dt_vacinacao">Data de nacimento do cidadão</label><br />
      <input
        type="date"
        name="bithday"
        v-model="application.citizen.birthday"
      />
      <br />

      <label for="lot">Lote</label> <br />
      <select class="select-form" name="lot" v-model="application.lot_id">
        <option v-for="lot in lots" :key="lot.id" :value="lot.id">
          {{ lot.name }}
        </option>
      </select>
      <br />

      <label for="vaccinator">Vacinador</label><br />
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
        </option> </select
      ><br />

      <label for="dt_vacinacao">Data da vacinação</label><br />
      <input
        type="date"
        name="dt_vacinacao"
        v-model="application.application_date"
      />
      <br />

      <label for="grupo_prioriario">Grupo prioritário</label>
      <br />
      <select
        class="select-form"
        v-model="application.category_id"
        name="grupo_prioritario"
        @change="() => fetchServicegroups(application.category_id)"
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

      <div v-if="application.category_id">
        <label for="grupo_atendimento">Grupo de atendimento</label>
        <br />
        <select
          class="select-form"
          v-model="application.servicegroup_id"
          name="grupo_atendimento"
        >
          <option
            v-for="servicegroup in servicegroups"
            :key="servicegroup.id"
            :value="servicegroup.id"
          >
            {{ servicegroup.name }}
          </option>
        </select>
        <br />
      </div>
      <br />
      <button @click.prevent="saveApplication">
        Salvar
      </button>
      <br />
      <button @click.prevent="clearForm">
        Limpar
      </button>
      <p>{{ message }}</p>
    </div>
  </div>
</template>
<script>
import { api } from "../services";

export default {
  name: "Dashboard",

  data: () => ({
    application: {
      location_id: "",
      lot_id: "",
      category_id: "",
      servicegroup_id: "",
      vaccinator_id: "",
      application_date: "",
      dose: 1,
      citizen: {
        cpf: "",
        cns: "",
        name: "",
        birthday: "",
      },
    },
    locations: null,
    categories: null,
    servicegroups: null,
    lots: null,
    vaccinators: null,
    message: null,
  }),
  methods: {
    saveApplication() {
      api.post("/applications", this.application).then(() => {
        this.message = "Dados registrados com sucesso!";
      });
    },
    clearForm() {
      this.application.lot_id = "";
      this.application.category_id = "";
      this.application.servicegroup_id = "";
      this.application.citizen.cpf = "";
      this.application.citizen.cpf = "";
      this.application.citizen.name = "";
      this.application.citizen.birthday = "";
      this.message = null;
    },
    fetchVaccinators() {
      api.get("/vaccinators").then(({ data }) => {
        this.vaccinators = data.data;
      });
    },
    fetchLocations() {
      api.get("/locations").then(({ data }) => {
        this.locations = data.data;
      });
    },
    fetchCategories() {
      api.get("/categories").then(({ data }) => {
        this.categories = data.data;
      });
    },
    fetchServicegroups(category_id) {
      api.get(`/servicegroups?category_id=${category_id}`).then(({ data }) => {
        this.servicegroups = data.data;
      });
    },
    fetchLots() {
      api.get("/lots").then(({ data }) => {
        this.lots = data.data;
      });
    },
  },
  created() {
    this.fetchVaccinators();
    this.fetchLocations();
    this.fetchCategories();
    this.fetchLots();
  },
};
</script>

<style scoped>
input,
select {
  padding: 0.1rem 0.3rem 0.2rem;
}
input,
select {
  border: 1px solid black;
}
select {
  -webkit-appearance: menulist !important; /* override vuetify style */
  -moze-appearance: menulist !important; /* override vuetify style */
  appearance: menulist !important; /* override vuetify style */
}
.text-header {
  font-family: "Roboto", sans-serif;
  font-size: 1.2em;
  padding: 1rem 2rem;
}
.form {
  padding-left: 2rem;
}
</style>
