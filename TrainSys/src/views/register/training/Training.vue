<template>
    <h1>Treino</h1>
    <p>Matrícula: {{ this.$route.params.id }}</p>
    <p>Nome: {{ this.$route.query.title }}</p>
  
    <v-form @submit.prevent="handleSubmitTraining">
      <v-select
      label="Qual o exercício?" 
      placeholder="Escolha o exercicio" 
      :items="exercises" 
      item-title="description"
      item-value="id"
      type="text"
      v-model="exercise_id"
      class="w-25 px-2" variant="outlined"
      />
  
      <v-text-field
      label="Repetições" 
      placeholder="Insira o número de repetições" 
      type="number"
      v-model="repetitions"
      :error-messages="this.errorValidation.repetitions"
      class="w-25 px-2" variant="outlined" 
      />
  
      <v-text-field
      label="Peso" 
      placeholder="Insira a quantidade de peso" 
      type="number"
      v-model="weight"
      suffix="kg"
      :error-messages="this.errorValidation.weight"
      class="w-25 px-2" variant="outlined" 
      />
  
      <v-text-field
      label="Tempo de pausa" 
      placeholder="Insira o tempo da pausa" 
      type="time"
      v-model="break_time"
      :error-messages="this.errorValidation.break_time"
      class="w-25 px-2" variant="outlined" 
      />
  
      <v-select
      label="Dia da semana" 
      :items="week" 
      item-title="dayWeek" 
      item-value="value" 
      type="text"
      v-model="day"
      class="w-25 px-2" variant="outlined"
      />
  
      <v-text-field
      label="" 
      placeholder="Observações para o treino" 
      type="text"
      v-model="observations"
      class="w-25 px-2" variant="outlined" 
      />
  
      <v-btn color="success" class="mt-1 me-2" size="large" type="submit">Cadastrar</v-btn>
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
        alert('Não foi possível carregar a lista de exercícios nesse momento, por favor, tente novamente mais tarde.')})
    }
}
</script>