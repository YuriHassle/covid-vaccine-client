<template>
    <section class="container">
     <div class="validation-errors" v-if="errors.length">
      <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
      <ol>
        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
      </ol>
    </div>
    <form>
        <FormField
            label="Senha Antiga"
            :required="true"
            name="old-password"
        >
            <input
            type="password"
            name="old-password"
            v-model="user.password"
            />
        </FormField>

        <FormField
            label="Nova Senha"
            :required="true"
            name="new-password"
        >
            <input
            type="password"
            name="new-password"
            v-model="user.new_password"
            />
        </FormField>
        <FormField
            label="Confirmar Senha"
            :required="true"
            name="confirm-password"
        >
            <input
            type="password"
            name="confirm-password"
            v-model="user.new_confirm_password"
            />
        </FormField>
        <button class="btn" @click.prevent="updatePassword()">
        Atualizar
      </button>
      <button class="btn btn-danger" @click.prevent="back()">Cancelar</button>
    </form>
    </section>
</template>

<script>

import FormField from '../components/FormField';
import { api } from '../services';
import Swal from 'sweetalert2';

export default {
    name: 'updatepassword',
     components: {
      FormField,
    },
    data() {
        return {
            errors: [],
            user: {}
        }
    },

    methods: {
        updatePassword() {
            api.put('/users/updatepassword', this.user).then(({ data }) => {
                if(data.data.length > 0){
                    this.errors = data.data.errors
                }else{
                    this.errors = []
                    Swal.fire({
                        icon: 'success',
                        title: 'Alteração realizada com êxito',
                        text: 'Os dados foram atualizados com sucesso!',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    this.$router.push('/');
                }
            });
        },

        back(){
            this.$router.go(-1);
        }
    }
}
</script>

<style scoped>
  .btn {
    display: flex;
    margin: auto;
    margin-top: 20px;
    margin-bottom: 10px;
  }

  .btn-danger {
    background: #f27474;
  }

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