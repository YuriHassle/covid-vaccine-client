<template>
  <div class="entire-div">
    <div class="text-header">
      <p>Vacinação COVID-19, SEMSA MANAUS</p>
    </div>
    <div class="form">
      <label for="location">Sala (Local)</label> <br />
      <select class="select-form" name="location" v-model="location_id">
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
        v-model="citizen.cpf"
        v-mask="'###.###.###-##'"
      />
      <br />

      <label for="cns">CNS do cidadão</label><br />
      <input
        type="text"
        name="cns"
        v-model="citizen.cns"
        v-mask="'XXXXXXXXXXXXXXX'"
      />
      <br />

      <label for="nome">Nome do cidadão</label><br />
      <input type="text" name="nome" v-model="citizen.name" />
      <br />

      <label for="dt_vacinacao">Data de nacimento do cidadão</label><br />
      <input type="date" name="bithday" v-model="citizen.birthday" />
      <br />

      <label for="lot">Lote</label> <br />
      <select class="select-form" name="lot" v-model="lot_id">
        <option v-for="lot in lots" :key="lot.id" :value="lot.id">
          {{ lot.name }}
        </option>
      </select>
      <br />

      <label for="vaccinator">Vacinador</label><br />
      <select class="select-form" name="vaccinator" v-model="vaccinator_id">
        <option
          v-for="vaccinator in vaccinators"
          :value="vaccinator.id"
          :key="vaccinator.id"
        >
          {{ vaccinator.name }}
        </option> </select
      ><br />

      <label for="dt_vacinacao">Data da vacinação</label><br />
      <input type="date" name="dt_vacinacao" v-model="application_date" />
      <br />

      <label for="grupo_prioriario">Grupo prioritário</label>
      <br />
      <select
        class="select-form"
        v-model="category_id"
        name="grupo_prioritario"
        @change="() => fetchServicegroups(category_id)"
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

      <div v-if="category_id">
        <label for="grupo_atendimento">Grupo de atendimento</label>
        <br />
        <select
          class="select-form"
          v-model="category_id"
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

      <input
        type="submit"
        value="Próxima"
        @click="testeIndex"
        style="padding: 0.2rem"
      />
    </div>
  </div>
</template>
<script>
import { api } from "../services";

export default {
  name: "Dashboard",

  data: () => ({
    location_id: "",
    lot_id: "",
    category_id: "",
    servicegroups_id: "",
    vaccinator_id: "",
    application_date: "",
    dose: 1,
    locations: null,
    categories: null,
    servicegroups: null,
    lots: null,

    citizen: {
      cpf: "",
      cns: "",
      name: "",
      birthday: "",
    },

    vaccinators: null,
  }),
  methods: {
    testeIndex() {
      //console.log(this.select.indexOf(this.opt));
    }, //funcao teste criada para pegar o index do array > category_id, its work!
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
