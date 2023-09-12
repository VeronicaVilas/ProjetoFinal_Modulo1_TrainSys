<template>

  <div class="d-flex">
    <v-icon class="icon mt-6 ms-5" icon="mdi-dumbbell" size="x-large"></v-icon>
    <h1 class="title mt-10 ml-2">Treino</h1>
  </div>

  <hr>
  
  <v-form class="d-flex flex-wrap" disabled>
      <v-text-field
      v-model="student_id"
      label="Matrícula"
      variant="outlined"
      class="px-2 mt-5"
      />
      <v-text-field
      v-model="student_name"
      label="Nome"
      variant="outlined"
      class="px-2 mt-5"
      />
    </v-form>

  <v-form @submit.prevent="handleSubmitTraining">

    <v-select
    label="Qual o exercício?" 
    placeholder="Escolha o exercicio" 
    :items="exercises" 
    item-title="description"
    item-value="id"
    type="text"
    v-model="exercise_id"
    variant="outlined"
    class="px-2 mb-3"
    />

    <div class="d-flex flex-wrap">

      <v-text-field
      label="Repetições" 
      placeholder="Insira o número de repetições" 
      type="number"
      v-model="repetitions"
      :error-messages="this.errorValidation.repetitions"
      variant="outlined"
      class="w-30 px-2 mb-3" 
      />
  
      <v-text-field
      label="Peso" 
      placeholder="Insira a quantidade de peso" 
      type="number"
      v-model="weight"
      suffix="kg"
      :error-messages="this.errorValidation.weight"
      variant="outlined" 
      class="w-30 px-2 mb-3"
      />

      <v-text-field
      label="Tempo de pausa" 
      placeholder="Insira o tempo da pausa" 
      type="time"
      v-model="break_time"
      :error-messages="this.errorValidation.break_time"
      variant="outlined" 
      class="w-30 px-2 mb-3"
      />

      <v-select
      label="Dia da semana" 
      :items="week" 
      item-title="dayWeek" 
      item-value="value" 
      type="text"
      v-model="day"
      variant="outlined"
      class="w-30 px-2 mb-3"
      />
    </div>
  
    <v-text-field
    label="" 
    placeholder="Observações para o treino" 
    type="text"
    v-model="observations"
    variant="outlined" 
    class="input-observation px-2"
    />
  
    <div class="d-flex justify-end">
      <router-link to="/gerenciamento/alunos">
        <v-btn class="button-cancel ml-5" size="x-large">Cancelar</v-btn>
      </router-link>
      <v-btn class="button ml-5" size="x-large" type="submit">Cadastrar</v-btn>
    </div>
  </v-form>
</template>

<script>
import * as yup from 'yup'
import { captureErrorYup } from '../../../utils/captureErrorYup'
import axios from 'axios'

export default {
  data() {
    return {
      student_id: this.$route.params.id,
      student_name: this.$route.query.title,
      repetitions: "",
      weight: "",
      break_time: "",
      observations: "",
      day: this.getCurrentDay(),
      week:
      [
        {dayWeek: 'Segunda-feira', value: 'segunda'},
        {dayWeek: 'Terça-feira', value: 'terca'},
        {dayWeek: 'Quarta-feira', value: 'quarta'},
        {dayWeek: 'Quinta-feira', value: 'quinta'},
        {dayWeek: 'Sexta-feira', value: 'sabado'},
        {dayWeek: 'Domingo', value: 'domingo'},
      ],
      exercises: [],
      exercise_id: "",

      errorValidation: {}
    }
  },

  methods: {
    getCurrentDay(){
      const value = new Date().getDay()
      
      const daysWeek = [
        {value: 'domingo', number: 0},
        {value: 'segunda', number: 1},
        {value: 'terça', number: 2},
        {value: 'quarta', number: 3},
        {value: 'quinta', number: 4},
        {value: 'sexta', number: 5},
        {value: 'sábado', number: 6}
      ]
      const option = daysWeek.find(item => item.number === value)

      return option.value
    },

    handleSubmitTraining() {
      try {
        const schema = yup.object().shape({
          repetitions: yup
          .string()
          .min(1, 'Insira no mínimo uma repetição')
          .required('A escolha da repetição é obrigatório'),
          weight: yup.string().required('A quantidade de peso é obrigatório'),
          break_time: yup.string().required('O tempo de pausa é obrigatório'),
        })
        schema.validateSync (
          {
            repetitions: this.repetitions,
            weight: this.weight,
            break_time: this.break_time
          },
          { abortEarly:false }
        )

        axios ({
          url: 'http://localhost:3000/workouts',
          method: 'POST',
          data: {
            student_id: this.student_id,
            exercise_id: this.exercise_id,
            repetitions: this.repetitions,
            weight: this.weight,
            break_time: this.break_time,
            day: this.day,
            observations: this.observations
          }
          })
          .then(() => {
            alert('Treino cadastrado com sucesso!')
            
            this.student_id = ''
            this.exercise_id = ''
            this.repetitions = ''
            this.weight = ''
            this.break_time = ''
            this.day = ''
            this.observations = ''

          })
          .catch(() => {
            alert('Não foi possível cadastrar um treino nesse momento, por favor, tente novamente mais tarde.')})

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
      this.exercises = response.data
    })
    .catch(() => {
      alert('Não foi possível carregar a lista de exercícios cadastrados nesse momento, por favor, tente novamente mais tarde.')})
  }
}
</script>

<style scoped>
  .title {
    text-transform: uppercase;
    font-size: 32px;
  }
  .icon {
    font-size: 60px;
  }

  hr{
    border: 1px solid;
  }

  .name-student-subtitle {
    font-size: 18px;
    padding: 8px;
    background: linear-gradient(80deg, #1976D2, #1337B4);
  }
  .input-observation {
    height: 150px;
  }

  .button {
    margin-top: -45px;
    width: 200px;

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

  .button-cancel {
    margin-top: -65px;
    width: 200px;

    text-transform: lowercase;
    font-weight: bold;
    font-size: 18px;

    background: linear-gradient(80deg, #BDBDBD, #616161);
    cursor: pointer;
  }

  .button-cancel:hover {
    background: black;
    color: white;
    box-shadow: 0 0 30px rgba(19, 55, 180, .5);
  }
</style>