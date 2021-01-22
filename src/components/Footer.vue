<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="primeira-secao">
        <p class="footer-text-header">Endereço</p>
        <p>
          Avenida Mário Ypiranga Monteiro, 1695 - Adrianópolis Cep: 69057-001
        </p>
      </div>
      <div class="segunda-secao">
        <p class="footer-text-header">Link</p>
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
        © 2021 - Secretaria Municipal de Saúde - SEMSA Desenvolvido pelo
      </p>
      <p>Departamento de Tecnologia da Informação - DTI.</p>
    </div>
  </footer>
</template>

<script>
  export default {};
</script>

<style scoped lang="scss">
  .copyright {
    background-color: #005346;
    p {
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 0px !important;
    }
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .footer {
    background-color: #005346;
    color: #f5f5f5;
    row-gap: 3;
    padding: 15px 10px 10px 5px;
  }
  .footer-container {
    display: flex;
  }
  .footer-text-header {
    padding-top: 1rem;
    padding-bottom: 1rem;
    margin-bottom: 0px !important;
    font-weight: bold;
    font-size: 1.2em;
  }
</style>
