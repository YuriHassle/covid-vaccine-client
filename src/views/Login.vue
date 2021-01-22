<template>
  <section class="login">
    <h1>Login</h1>
    <form>
      <label for="user">Usuário</label>
      <input type="text" name="user" id="user" v-model="credentials.user" />
      <label for="password">Senha</label>
      <input
        type="password"
        name="password"
        id="password"
        v-model="credentials.password"
      />
      <button class="btn" @click.prevent="logar">Logar</button>
      <div class="message">
        {{ message }}
      </div>
    </form>
  </section>
</template>

<script>
  import { validateLogin } from '../helper';
  import { api } from '../services';

  export default {
    name: 'Login',
    data() {
      return {
        message: '',
        credentials: {
          user: '',
          password: ''
        }
      };
    },
    methods: {
      logar() {
        this.message = 'Verificando credenciais...';
        if (validateLogin(this.credentials)) {
          const api_credentials = {
            email: 'imunizaapp@pmm.am.gov.br',
            password: 'vacinacovid123'
          };

          api.post('/login', api_credentials).then(({ data }) => {
            localStorage.setItem('token', data.access_token);
            this.$router.push('/');
          });
        } else {
          this.message = 'Credenciais inválidas!';
        }
      }
    }
  };
</script>

<style scoped>
  .login {
    max-width: 500px;
    margin: 0 auto;
    padding: 0 20px;
  }

  h1 {
    text-align: center;
    font-size: 2rem;
    margin-top: 40px;
    color: #87f;
  }

  form {
    display: grid;
  }

  .btn {
    padding: 0.2rem 1rem !important;
    border-radius: 0.4rem;
    border: none !important;
    margin-top: 1rem;
  }
</style>
