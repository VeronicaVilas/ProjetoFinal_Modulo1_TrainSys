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

