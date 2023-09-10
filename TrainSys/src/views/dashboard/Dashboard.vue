<template>
  <h1 class="title d-flex mt-8 ml-10">Olá, {{ usuario }}</h1>

  <v-card variant="outlined">
    <v-card-text class="d-flex">
      <p>Lista de alunos</p>
      <p>{{dashboard_infos.amount_students}} Alunos cadastrados</p>
      
      <router-link to="/gerenciamento/alunos">
        <v-btn size="large" type="submit">Vizualizar</v-btn>
      </router-link>
    </v-card-text>
  </v-card>
  
  <v-card variant="outlined">
    <v-card-text class="d-flex">
      <p>Cadastro de exercícios</p>
      <p>{{dashboard_infos.amount_exercises}} Exercicios cadastrados</p>
      
      <router-link to="/gerenciamento/exercicios">
        <v-btn size="large" type="submit">Adicionar</v-btn>
      </router-link>

    </v-card-text>
  </v-card>
</template>

<script>

import axios from 'axios'
  
export default {
  data() {
    return {
      usuario: localStorage.getItem("TrainSys_login_name"),
      dashboard_infos: []
    }
  },

  mounted() {
    axios ({
      url: 'http://localhost:3000/dashboard',
      method: 'GET',
      })
      .then((response) => {
        this.dashboard_infos = response.data
      })
        .catch(() => {
        alert('Desculpas, houve um erro de carregamento na página! Por favor, tente novamente mais tarde.')
      })
  }
}
</script>
  