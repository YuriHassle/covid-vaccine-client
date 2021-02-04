<template>
  <section class="container">
    <loading :active.sync="isLoading" 
      :can-cancel="true" 
      :is-full-page="true"></loading>

    <div class="validation-errors" v-if="errors.length">
      <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
      <ol>
        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
      </ol>
    </div>

      <UserForm
        type="edit"
        :user="user"
      >
        
    </UserForm>
    <div class="btn-group">
      <button class="btn" @click.prevent="updateUserData()">
        Atualizar
      </button>
      <button class="btn btn-danger" @click.prevent="back()">Cancelar</button>
    </div>
  </section>
</template>

<script>

import { api } from '../services';
import Swal from 'sweetalert2';
import UserForm from '../components/UserForm';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
    name: 'updateuserdata',
     components: {
      Loading,
      UserForm,
    },
    data() {
        return {
            errors: [],
            user: {},
            isLoading: false,
            edit: true,
        }
    },

    methods: {
        updateUserData() {
          this.isLoading = true
            api.put('/users/updateuserdata', this.user).then(({ data }) => {
                if(data.data.errors.length > 0){
                    this.errors = data.data.errors
                    this.isLoading = false
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
    },

    created(){
      this.isLoading = true
      let self = this
      this.$store
          .dispatch('getUser')
          .then(()=>{
            self.user = Object.assign({}, this.$store.state.user)
            this.isLoading = false
          })
    }
}
</script>

<style scoped>
  .btn {
    margin: auto;
    margin-top: 20px;
    margin-bottom: 10px;
  }

  .btn-danger {
    background: #f27474;
  }

  .validation-errors {
    padding-top: 20px;
    padding-bottom: 5px;
  }
  .validation-errors li {
    padding-top: 5px;
    color: red;
  }

</style>