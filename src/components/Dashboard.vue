<template>
  <div class="entire-div">
    <div class="text-header">
      <p>Vacinação COVID-19 - SEMSA Manaus</p>
    </div>
    <form class="form">
      <div>
        <p>Sala(Local)</p>
        <select class="select-form" v-model="select">
          <option disabled value="">Escolher</option>
          <option>Sambodrómo</option>
          <option>Estádio Carlos Zamith</option>
          <option>Parque do Idoso</option>
          <option>Shopping Phelipe Daou</option>
          <option>Outro</option>
        </select>
      </div>
      <div>
        <label for="cpf">CPF do cidadão</label>
        <input
          type="text"
          name="cpf"
          v-model="vacinado.cpf"
          v-mask="'###.###.###-##'"
        />
        <br />

        <label for="cns">CNS do cidadão</label>
        <input type="text" name="cns" v-model="vacinado.cns" />
        <br />

        <label for="nome">Nome do cidadão</label>
        <input type="text" name="nome" v-model="vacinado.name" />
        <br />

        <label for="lote">Lote</label>
        <input type="text" name="lote" v-model="vacinado.lote" />
        <br />

        <label for="cpf_vacinador"></label>
        <input type="text" name="cpf_vacinador" v-model="vacinador.cpf" />
        <br />

        <label for="dt_vacinacao">Data da vacinação</label>
        <input
          type="text"
          name="dt_vacinacao"
          v-model="vacinado.dt_vacinacao"
        />
        <br />

        <label for="grupo_prioriario">Grupo prioritário</label>
        <br />

        <!-- <input type="text" name="grupo_prioritario" v-model="vacinado.grupo" /> -->
        <select class="select-form" v-model="select2">
          <option disabled value="">Escolher</option>
          <option>Trabalhadores de Saúde</option>
          <option>Pessoas de 60 anos ou mais Institucionalizadas</option>
          <option>Povos Indígenas em terras indígenas</option>
          <option>Povos e Comunidades Tradicionais</option>
          <option>Faixa Etária</option>
          <option>Comorbidades</option>
          <option>Pessoas com Deficiência</option>
          <option>Forças Armadas (membros ativos)</option>
          <option>Trabalhadores da Educação</option>
          <option>Forças de Segurança e Salvamento</option>
          <option>Trabalhadores de Transporte</option>
          <option>Pessoas em Situação de Rua</option>
          <option>Trabalhadores Portuários</option>
          <option>Funcionário do Sistema de Privação de Liberdade</option>
          <option>População Privada de Liberdade</option>
        </select>
      </div>
      <br />

      <div>
        <input type="submit" value="Próxima" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Dashboard",

  data: () => ({
    select: "",
    select2: "",
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
};
</script>
