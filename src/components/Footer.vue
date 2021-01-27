<template>
  <footer>
    <div class="footer-container">
      <div class="footer-section">
        <h3>Endereço</h3>
        <p>
          Avenida Mário Ypiranga Monteiro, 1695 - Adrianópolis
        </p>
        <p>
          Cep: 69057-001
        </p>
      </div>
      <div class="footer-section">
        <h3>Link</h3>
        <p>
          <a href="https://semsa.manaus.am.gov.br/"
            >Secretaria Municipal de Saúde de Manaus</a
          >
        </p>
        <p><a href="http://www.manaus.am.gov.br/">Prefeitura de Manaus</a></p>
      </div>
    </div>
    <div class="copyright">
      <p>
        © 2021 - Secretaria Municipal de Saúde - SEMSA
      </p>
      <p>Desenvolvido pelo Departamento de Tecnologia da Informação - DTI</p>
    </div>
  </footer>
</template>

<script>
  export default {};
</script>

<style scoped lang="scss">
  p {
    margin-bottom: 5px;
  }
  .copyright {
    p {
      color: rgba(255, 255, 255, 0.8);
    }
    background-color: #005346;
    margin-left: 20px;
  }
  footer {
    background-color: #005346;
    color: #f5f5f5;
    padding: 15px 10px 10px 5px;
  }
  .footer-container {
    display: flex;
    align-items: flex-start;
    justify-content: space-evenly;
  }
  .footer-section {
    padding: 20px 20px;
  }
  @media screen and (max-width: 500px) {
    .footer-container {
      flex-direction: column;
    }
    .footer-section {
      padding: 10px 10px;
    }
  }

  h3 {
    margin-bottom: 10px;
  }
</style>
