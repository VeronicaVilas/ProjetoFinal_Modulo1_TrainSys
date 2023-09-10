<template>
  <div class="d-flex">
    <img :width="100" src="../../../images/Weights.png" alt="">
    <h1 class="title mt-13 ml-2">Exercícios</h1>
  </div>

  <hr>

  <v-form class="d-flex ma-2 mt-6" @submit.prevent="handleSubmitExercise">
    <v-text-field
    label="" 
    placeholder="Insira o nome do exercício para cadastrar" 
    type="text"
    v-model="description"
    :error-messages="this.errorValidation.description"
    variant="outlined"  
    class="w-25 px-2"
    />
  
    <v-btn class="button" size="x-large" type="submit">Cadastrar</v-btn>
  </v-form>
  
  <v-table class="exercise-table" density="compact">
    <thead>
      <tr>
        <th class="subtitle-table">Nome</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="exercises in exerciseList" :key="exercises.id"> 
        <td>{{ exercises.description }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
import * as yup from 'yup'
import { captureErrorYup } from '../../../utils/captureErrorYup'
import axios from 'axios'

export default {
  data() {
    return {
      description: "",
      exerciseList: [],

      errorValidation: {},
    }
  },

  methods: {
    handleSubmitExercise() {
      try {
        const schema = yup.object().shape({
          description: yup.string().required('O nome do exercício é obrigatório'),
        })
        schema.validateSync (
          {
            description: this.description,
          },
          { abortEarly:false }
        )

        axios ({
          url: 'http://localhost:3000/exercises',
          method: 'POST',
          data: {
            description: this.description,
          }
          })
          .then(() => {
            alert('Exercício cadastrado com sucesso!')
            this.$router.go()
          })
          .catch(() => {
            alert('Não foi possível cadastrar o exercício nesse momento, por favor, tente novamente mais tarde.')})
          
      } catch (error) {
          if (error instanceof yup.ValidationError) {
            console.log(error)

            this.errorValidation = captureErrorYup(error)
          }
      }
    }
  },

  mounted() {
    axios ({
      url: 'http://localhost:3000/exercises',
      method: 'GET',
    })
    .then((response) => {
      this.exerciseList = response.data})
    .catch(() => {
      alert('Não foi possível carregar a lista de exercícios nesse momento, por favor, tente novamente mais tarde.')})
  }
}
</script>

<style scoped>
.title {
  text-transform: uppercase;
  font-size: 32px;
}

hr{
  border: 1px solid;
}
.button {
  width: 200px;
  height: 55px;

  text-transform: lowercase;
  font-weight: bold;
  font-size: 18px;

  background: linear-gradient(80deg, #1976D2, #1337B4);
  cursor: pointer;
}

.button:hover {
  background: black;
  color: white;
  box-shadow: 0 0 30px rgba(19, 55, 180, .5);
}


.subtitle-table {
  font-size: 22px;
  background: linear-gradient(80deg, #1976D2, #1337B4);
}
.exercise-table tbody tr:nth-child(even) {
    background-color: #E3F2FD;
}
</style>