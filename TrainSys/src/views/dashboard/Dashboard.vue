<template>
  <div class="container">
    <h1 class="title d-flex mt-8 ml-10">Olá, {{ usuario }}</h1>
    <p class="ml-10">Seja bem vindo(a)! </p>

    <div class="d-flex">
      <div>
        <img class="ma-3 ml-16" :width="440" src="../../images/DashboardGym.svg" alt="Imagem de uma pessoa correndo">
      </div>

      <div class="card">
        <v-card variant="outlined" class="ma-6">
          <v-card-text class="d-flex">

            <div>
              <p class="subtitle my-1">Lista de alunos</p>
              <p class="my-1">{{dashboard_infos.amount_students}} Alunos cadastrados</p>
              
              <router-link to="/gerenciamento/alunos">
                <v-btn class="btn my-3 mt-5" size="large" type="submit">Vizualizar</v-btn>
              </router-link>
            </div>

            <div class="d-flex justify-end">
              <img :width="140" class="ml-8" src="../../images/Students.png" alt="">
            </div>

          </v-card-text>
        </v-card>
        
        <v-card variant="outlined" class="ma-6">
          <v-card-text class="d-flex">

            <div>
              <p class="subtitle my-1">Cadastro de exercícios</p>
              <p class="my-1">{{dashboard_infos.amount_exercises}} Exercicios cadastrados</p>
              
              <router-link to="/gerenciamento/exercicios">
                <v-btn class="btn my-3 mt-5" size="large" type="submit">Adicionar</v-btn>
              </router-link>
            </div>

            <div class="d-flex justify-end">
              <img :width="140" class="ml-8" src="../../images/Weights.png" alt="">
            </div>

          </v-card-text>
        </v-card>
      </div>
    </div>
  </div>
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
        alert('Não é possível carregar a página no momento! Por favor, tente novamente mais tarde.')
      })
  }
}
</script>

<style scoped>
.container {
  height: 83vh;
  overflow: hidden;
}

.card {
  width: 470px;
  height: 430px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 140px;
}

.subtitle {
  text-transform: uppercase;
  font-weight: bold;
  font-size: 16px;
}

.btn {
  width: 200px;
  height: 45px;


  text-transform: lowercase;
  font-weight: bold;
  font-size: 16px;

  background: linear-gradient(80deg, #1976D2, #1337B4);
  cursor: pointer;
}

.btn:hover {
  background: black;
  color: white;
  box-shadow: 0 0 30px rgba(19, 55, 180, .5);
}

</style>