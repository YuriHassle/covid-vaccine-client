<template>
  <section class="login">
    <h1>Entrar</h1>
    <form>
      <label for="user">CPF</label>
      <input type="text" name="user" id="user" v-model="credentials.cpf" />
      <label for="password">Senha</label>
      <input
        type="password"
        name="password"
        id="password"
        v-model="credentials.password"
      />
      <button class="btn" @click.prevent="login">Logar</button>
      <div class="message">
        {{ message }}
      </div>
    </form>
  </section>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        message: '',
        credentials: {
          cpf: '',
          password: ''
        }
      };
    },
    methods: {
      login() {
        this.message = 'Verificando credenciais...';
        this.$store
          .dispatch('login', this.credentials)
          .then(data => {
            console.log(data.data);
            if (data.data.successful_login) {
              this.$router.push({ name: 'home' });
            } else {
              this.message = 'Credenciais inválidas!';
            }
          })
          .catch(() => {
            this.message = 'Não foi possível se conectar com o servidor :(';
          });
      }
    }
  };
</script>

<style scoped>
  h1 {
    text-align: center;
    font-size: 2rem;
    margin-top: 40px;
    color: #87f;
  }

  .login {
    min-height: 50vh;
    padding: 10px 20px;
  }

  form {
    display: grid;
    min-width: 30vw;
  }

  .btn {
    padding: 0.2rem 1rem !important;
    border-radius: 0.4rem;
    border: none !important;
    margin-top: 1rem;
    height: 30px;
  }
</style>
