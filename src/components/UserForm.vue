<template>
  <form>
    
    <h1 v-if="type=='edit'">Atualizar Dados</h1>
    <h1 v-else >Cadastrar Usuário</h1>
    
    <div class="fields-container">
     <FormField label="Nome" :required="true" name="name">
        <input
          type="text"
          name="name"
          v-model.trim="user.name"
          disabled="type=='edit'"
        />
      </FormField>

      <FormField label="CPF" :required="true" name="cpf">
        <input
          type="text"
          name="cpf"
          v-model="user.cpf"
          disabled="type=='edit'"
        />
      </FormField>

      <FormField label="Email" :required="true" name="email">
        <input
          type="text"
          name="email"
          inputmode="text"
          v-model="user.email"
        />
      </FormField>
    </div>
  </form>
</template>

<script>
  import FormField from './FormField';
  export default {
    name: 'UserForm',
    props: [
      'type',
      'user',
    ],
    components: {
      FormField,
    },
    data() {
      return {
      };
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
