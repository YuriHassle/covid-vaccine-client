<template>
  <div class="entire-div">
    <div class="text-header">
      <p>Vacinação COVID-19, SEMSA MANAUS</p>
    </div>
    <div class="form">
      <label>Sala(Local)</label> <br />
      <select class="select-form" v-model="opt">
        <option v-for="(item, index) in select" :key="index">
          {{ item }}
        </option></select
      ><br />
      <label for="cpf">CPF do cidadão</label><br />
      <input
        type="text"
        name="cpf"
        v-model="vacinado.cpf"
        v-mask="'###.###.###-##'"
      />
      <br />

      <label for="cns">CNS do cidadão</label><br />
      <input
        type="text"
        name="cns"
        v-model="vacinado.cns"
        v-mask="'XXXXXXXXXXXXXXX'"
      />
      <br />

      <label for="nome">Nome do cidadão</label><br />
      <input type="text" name="nome" v-model="vacinado.name" />
      <br />

      <label for="lote">Lote</label><br />
      <input type="text" name="lote" v-model="vacinado.lote" />
      <br />

      <label for="cpf_vacinador">CPF do vacinador</label><br />
      <input type="text" name="cpf_vacinador" v-model="vacinador.cpf" />
      <br />

      <label for="dt_vacinacao">Data da vacinação</label><br />
      <input type="text" name="dt_vacinacao" v-model="vacinado.dt_vacinacao" />
      <br />

      <label for="grupo_prioriario">Grupo prioritário</label>
      <br />

      <!-- <input type="text" name="grupo_prioritario" v-model="vacinado.grupo" /> -->
      <select class="select-form" v-model="opt2">
        <option v-for="(item, index) in select2" :key="index">
          {{ item }}
        </option>
      </select>
      <br />
      <div v-if="opt2 != ''">
        <label>Grupo de Atendimento</label><br />
        <div v-if="select2.indexOf(opt2) == 0">
          <select>
            <option v-for="(item, index) in select3" :key="index">
              {{ item }}
            </option>
          </select>
        </div>
        <div v-else-if="select2.indexOf(opt2) == 1">
          <!-- caso em que não há subitem -->
        </div>
        <div v-else-if="select2.indexOf(opt2) == 2">
          <!-- caso em que não há subitem -->
        </div>
        <div v-else-if="select2.indexOf(opt2) == 3">
          <input
            type="radio"
            v-model="comunidade"
            name="quilombola"
            value="0"
          />
          <label for="quilombola">
            Povos e Comunidades Tradicionais - Quilombola</label
          >
          <br />
          <input
            type="radio"
            v-model="comunidade"
            name="ribeirinha"
            value="1"
          />
          <label for="ribeirinha">
            Povos e Comunidades Tradicionais - Ribeirinha</label
          >
        </div>
        <div v-else-if="select2.indexOf(opt2) == 4">
          <input type="radio" value="0" />
          <label> Pessoas de 80 anos ou mais </label> <br />
          <input type="radio" value="1" />
          <label> Pessoas de 75 a 79 anos </label> <br />
          <input type="radio" value="2" />
          <label> Pessoas de 70 a 74 anos </label> <br />
          <input type="radio" value="3" />
          <label> Pessoas de 65 a 69 anos </label> <br />
          <input type="radio" value="4" />
          <label> Pessoas de 60 a 64 anos </label>
        </div>

        <div v-else-if="select2.indexOf(opt2) == 5">
          <input type="radio" value="" />
          <label> Anemia Falciforme </label> <br />
          <input type="radio" value="" />
          <label> Câncer </label> <br />
          <input type="radio" value="" />
          <label> Diabetes Mellitus </label> <br />
          <input type="radio" value="" />
          <label> Doença Pulmonar Obstrutiva Crônica </label> <br />
          <input type="radio" value="" />
          <label> Doença Renal </label> <br />
          <input type="radio" value="" />
          <label> Doenças Cardiovasculares e Cerebrovasculares </label> <br />
          <input type="radio" value="" />
          <label>
            Hipertensão de difícil controle ou com complicações/lesão de órgão
            alvo
          </label>
          <br />
          <input type="radio" value="" />
          <label> Indivíduos Transplantados de Órgão Sólido </label> <br />
          <input type="radio" value="" />
          <label> Obesidade Grave (Imc≥40) </label> <br />
          <input type="radio" value="" />
          <label> Síndrome de Down </label> <br />
          <input type="radio" value="" />
          <label> Outras </label>
        </div>
        <div v-else-if="select2.indexOf(opt2) == 6">
          <input type="radio" />
          <label>
            Pessoas com Deficiência - Pessoas com Deficiência
            Institucionalizadas
          </label>
          <br />
          <input type="radio" />
          <label>
            Pessoas com Deficiência - Pessoas com Deficiências Permanente Grave
          </label>
        </div>
        <div v-else-if="select2.indexOf(opt2) == 7">
          <input type="radio" />
          <label> Marinha do Brasil - MB </label>
          <br />
          <input type="radio" />
          <label> Exército Brasileiro - EB </label><br />
          <input type="radio" />
          <label> Força Aérea Brasileira - FAB </label>
        </div>
        <div v-else-if="select2.indexOf(opt2) == 8">
          <input type="radio" />
          <label> Trabalhadores da Educação - Ensino Básico </label><br />
          <input type="radio" />
          <label> Trabalhadores da Educação - Ensino Superior </label>
        </div>

        <div v-else-if="select2.indexOf(opt2) == 9">
          <input type="radio" />
          <label> Bombeiro Civil </label>
          <br />
          <input type="radio" />

          <label> Bombeiro Militar </label>
          <br />
          <input type="radio" />

          <label> Guarda Municipal </label>
          <br />
          <input type="radio" />

          <label> Policial Rodoviário Federal </label>
          <br />
          <input type="radio" />

          <label> Policial Civil </label>
          <br />
          <input type="radio" />

          <label> Policial Federal </label>
          <br />
          <input type="radio" />

          <label> Policial Militar </label>
        </div>

        <div v-else-if="select2.indexOf(opt2) == 10">
          <input type="radio" />
          <label> Aéreo </label><br />
          <input type="radio" />
          <label> Caminhoneiro </label> <br />
          <input type="radio" />
          <label>
            Coletivo Rodoviário Passageiros Urbano e de Longo Curso </label
          ><br />
          <input type="radio" />
          <label> Ferroviário </label><br />
          <input type="radio" />
          <label> Metroviário </label><br />
          <input type="radio" />
          <label> Aquaviário </label>
        </div>
        <div v-else-if="select2.indexOf(opt2) == 11">
          <!-- caso em que não há subitem -->
        </div>
        <div v-else-if="select2.indexOf(opt2) == 12">
          <!-- caso em que não há subitem -->
        </div>
        <div v-else-if="select2.indexOf(opt2) == 13">
          <!-- caso em que não há subitem -->
        </div>
        <div v-else-if="select2.indexOf(opt2) == 14">
          <!-- caso em que não há subitem -->
        </div>
        <div v-else-if="select2.indexOf(opt2) == 15">
          <!-- caso em que não há subitem -->
        </div>
      </div>
      <br />

      <div>
        <input type="submit" value="Próxima" @click="testeIndex" style="padding: .2rem"/>
      </div>
    </div>
  </div>
</template>
<style scoped>
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
<script>
export default {
  name: "Dashboard",

  data: () => ({
    opt: "",
    opt2: "",
    opt3: "",
    comunidade: "",
    select: [
      "Sambódromo",
      "Estádio Carlos Zamith",
      "Parque do Idoso",
      "Shopping Phelipe Daou",
      "Outro",
    ],
    select2: [
      "Trabalhadores de Saúde",
      "Pessoas de 60 anos ou mais Institucionalizadas",
      "Povos Indígenas em terras indígenas",
      "Povos e Comunidades Tradicionais",
      "Faixa Etária",
      "Comorbidades",
      "Pessoas com Deficiência",
      "Forças Armadas (membros ativos)",
      "Trabalhadores da Educação",
      "Forças de Segurança e Salvamento",
      "Trabalhadores de Transporte",
      "Pessoas em Situação de Rua",
      "Trabalhadores Portuários",
      "Funcionário do Sistema de Privação de Liberdade",
      "Populaçao Privada de Liberdade",
    ],
    select3: [
      "Auxiliar de Veterinário",
      "Biólogo",
      "Biomédico",
      "Cozinheiro e Auxiliares",
      "Cuidador de Idosos",
      "Doula/Parteira",
      "Enfermeiro(a)",
      "Farmacêutico",
      "Fisioterapeutas",
      "Fonoaudiólogo",
      "Funcionário do Sistema Funerário que tenham contato com cadáveres contaminados",
      "Médico",
      "Médico Veterinário",
      "Motorista de Ambulância",
      "Nutricionista",
      "Odontologista",
      "Pessoal da Limpeza",
      "Profissionais de Educação Física",
      "Psicólogo",
      "Recepcionista",
      "Segurança",
      "Assistentes Sociais",
      "Técnico de Enfermagem",
      "Técnico de Veterinário",
    ],

    vacinado: {
      cpf: "",
      cns: "",
      name: "",
      dt_vacinacao: "",
      grupo: "",
    },
    vacinador: {
      cpf: "",
    },
  }),
  methods: {
    teste() {
      console.log(this.select.indexOf(this.opt));
    }, //funcao teste criada para pegar o index do array > category_id, its work!
  },
};
</script>
