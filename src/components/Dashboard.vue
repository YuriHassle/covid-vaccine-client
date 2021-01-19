<template>
  <div class="entire-div">
    <div class="text-header">
      <p>Vacinação COVID-19, SEMSA MANAUS</p>
    </div>
    <div class="form">
      <div class="box-form">
        <label for="location">Sala (local)</label> <br />
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
        <label for="cpf">CPF do cidadão</label><br />
        <input
          type="text"
          name="cpf"
          v-model="application.citizen.cpf"
          v-mask="'###########'"
        />
        <br />
      </div>
      <div class="box-form">
        <label for="cns">CNS do cidadão</label><br />
        <input
          type="text"
          name="cns"
          v-model="application.citizen.cns"
          v-mask="'XXXXXXXXXXXXXXX'"
        />
        <br />
      </div>
      <div class="box-form">
        <label for="nome">Nome do cidadão</label><br />
        <input type="text" name="nome" v-model="application.citizen.name" />
        <br />
      </div>
      <div class="box-form">
        <label for="dt_vacinacao">Data de nacimento do cidadão</label><br />
        <input
          type="date"
          name="bithday"
          v-model="application.citizen.birthday"
        />
        <br />
      </div>
      <div class="box-form">
        <label for="lot">Lote</label> <br />
        <select class="select-form" name="lot" v-model="application.lot_id">
          <option v-for="lot in lots" :key="lot.id" :value="lot.id">
            {{ lot.name }}
          </option>
        </select>
        <br />
      </div>
      <div class="box-form">
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
          </option></select
        ><br />
      </div>

      <div class="box-form">
        <label for="dt_vacinacao">Data da vacinação</label><br />
        <input
          type="date"
          name="dt_vacinacao"
          v-model="application.application_date"
        />
        <br />
      </div>
      <div class="box-form">
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
      </div>
      <div class="box-form" v-if="application.category_id">
        <div>
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
      </div>
      <br />
      <div>
        <button class="button save" @click.prevent="saveApplication">SALVAR</button>
        <button class="button clean" style="margin-left: 2rem" @click.prevent="clearForm">LIMPAR</button>
      </div>
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

<style lang="scss">
input,
select {
  padding: 0.1rem 0.3rem 0.2rem;
  border: 1px solid black !important;
  outline: black;
  margin: 0.4rem 0rem 0.4rem 0rem;
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
label, option{
  font-family: 'Open Sans', sans-serif;
  font-size: 1em;
}
.text-header {
  background-color: rgb(0, 150, 136);
  p {
    font-family: "Roboto", sans-serif;
    font-weight: bold;
    font-size: 1.5em;
    padding: 1rem 2rem;
    color: rgba(22, 22, 22, 0.884);
  }
}
.v-application--wrap {
  background-color: rgb(217, 239, 237) !important;
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
  width: 50%;
  background-color: white;
  margin: 1rem 0rem 1rem 0rem;
  border-radius: 0.2rem;
  // filter: drop-shadow(2px 2px 2px black);
  padding: 0.4rem 4rem 0.4rem 1rem;
}
.button{
  border: 1px solid black;
  padding: .2rem 2rem;
  border-radius: .4rem;
  color: #009aa0;
}
.save{
  background-color: snow;
  outline: none;
}
.clean{
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
}
</style>
