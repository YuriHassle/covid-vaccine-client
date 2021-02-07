<template>
  <header>
    <div class="header-title">
      <a class="vacinometro" href="https://labonline.manaus.am.gov.br/">
        <p>VACINAÇÃO COVID-19</p>
        <b>SEMSA MANAUS</b>
      </a>
    </div>
    <a href="https://manaus.am.gov.br">
      <img src="../assets/full_brand.png" />
    </a>
  </header>
</template>

<script>
  export default {};
</script>

<style scoped lang="scss">
  header {
    background-color: #0ca3ab;
    padding: 25px;
    display: flex;
    justify-content: space-between;
    background-image: url(../assets/bg-header.png);
    background-position: bottom left;
    background-repeat: repeat-x;
    a {
      margin-bottom: 20px;
    }
  }

  .header-title {
    p {
      font-size: 1.8rem;
      font-weight: 700;
      color: #fff;
      margin-bottom: 0;
    }
    b {
      font-size: 1.2rem;
      color: #fff;
      font-weight: 600;
    }
    a {
      text-decoration: none;
    }
  }
</style>
