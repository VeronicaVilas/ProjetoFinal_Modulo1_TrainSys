<template>
  <h1 class="title d-flex mt-8 ml-10">Bem vindo(a)</h1>

  <v-card variant="outlined">
    <v-card-text class="d-flex">
      <p>Lista de alunos</p>
      <p>Alunos cadastrados</p>
      
      <router-link to="/gerenciamento/alunos">
        <v-btn size="large" type="submit">Vizualizar</v-btn>
      </router-link>
    </v-card-text>
  </v-card>
  
  <v-card variant="outlined">
    <v-card-text class="d-flex">
      <p>Cadastro de exercícios</p>
      <p>Exercicios cadastrados</p>
      
      <router-link to="/gerenciamento/exercicios">
        <v-btn size="large" type="submit">Adicionar</v-btn>
      </router-link>

    </v-card-text>
  </v-card>
</template>