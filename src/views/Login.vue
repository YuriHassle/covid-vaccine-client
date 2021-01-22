<template>
  <section class="login">
    <h1>Login</h1>
    <form>
      <label for="email">Usuário</label>
      <input type="email" name="email" id="email" v-model="credentials.user" />
      <label for="senha">Senha</label>
      <input
        type="password"
        name="senha"
        id="senha"
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
    background-color: rgb(226, 241, 229);
    color: rgb(0, 150, 136) !important;
    border: none !important;
    margin-top: 1rem;
  }

  .perdeu {
    text-align: center;
    margin: 20px auto 0 auto;
  }

  .perdeu a:hover {
    color: #87f;
    text-decoration: underline;
  }
</style>
