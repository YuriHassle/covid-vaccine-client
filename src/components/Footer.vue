<template>
  <footer class="pa-8">
    <div class="container">
      <div class="footer-text">
        <p>
          © 2021 - Secretaria Municipal de Saúde - SEMSA
        </p>
        <p>
          Desenvolvido pelo Departamento de Tecnologia da Informação - DTI.
        </p>
      </div>
      <div class="footer-images">
        <a href="https://covid19.manaus.am.gov.br/">
          <img src="../assets/covid_combat.png" />
        </a>
        <a href="https://semsa.manaus.am.gov.br/">
          <img src="../assets/semsa_logo.png" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {};
</script>

<style scoped lang="scss">
  footer {
    background-color: #0ca3ab;
    background-image: url(../assets/bg-footer.png);
    background-position: bottom left;
    background-repeat: repeat-x;
  }

  p {
    margin-top: 5px;
    margin-bottom: 5px;
    color: #fff;
  }

  .footer-images {
    a {
      margin-left: 40px;
    }
  }

  .container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
  }

  @media screen and (max-width: 500px) {
    footer {
      flex-direction: column;
    }
  }
</style>
