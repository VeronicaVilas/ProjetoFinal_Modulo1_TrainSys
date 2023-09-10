<template>
  <header class="header">
    <div class="complement-header"></div>

        <div class="position d-flex">
          <v-icon class="logo-icon mt-4 ms-5" icon="mdi-weight-lifter" size="small"></v-icon>
          <p class="logo-title mt-3" >rainSys</p>    
        </div>

        <div class="position d-flex justify-end">
          <router-link to="/dashboard">
            <v-btn class="button-header" :height="72" variant="text" prepend-icon="mdi-home">Home</v-btn>
          </router-link>

          <router-link to="/cadastro/novo-aluno">
            <v-btn class="button-header" :height="72" variant="text" prepend-icon="mdi-account">Cadastro de Alunos</v-btn>
          </router-link>

          <router-link to="/">
            <v-btn class="button-header" :height="72" variant="text" prepend-icon="mdi-logout">Sair</v-btn>
          </router-link>
        </div>
  </header>
</template>

<style scoped>
  .header {
    height: 80px;

    background: linear-gradient(800deg, #90CAF9, #42A5F5, #1976D2, #1337B4);
    box-shadow: 0 0 30px rgba(0, 0, 0, .5);
  }
  .complement-header {
    height: 72px;
    background-image: url(../images/header.jpg);
    background-size: 100%;
  }

  .position {
    width: 100%;
    margin-top: -72px;
  }
  .logo-title {
    display: flex;
    margin-left: -10px;

    font-size: 40px;
    font-family: 'Black Ops One';

    color: white;
  }

  .logo-icon {
    margin-left: -10px;

    font-size: 40px;
    font-family: 'Black Ops One';

    color: #1337B4;
  }
  .button-header{
    color: white;
  }
  .button-header:hover {
    background: linear-gradient(80deg, #1976D2, #1337B4);
  }
</style>