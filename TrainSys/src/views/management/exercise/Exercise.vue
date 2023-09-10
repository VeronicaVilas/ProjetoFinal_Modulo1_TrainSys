<template>
  <v-form @submit.prevent="handleSubmitExercise">
    <v-text-field
    label="" 
    placeholder="Insira o nome do exercício para cadastro" 
    type="text"
    v-model="description"
    :error-messages="this.errorValidation.description"
    variant="outlined"  
    />
  
    <v-btn type="submit">Cadastrar</v-btn>
  </v-form>
  
  <v-table >
    <thead>
      <tr>
        <th>Nome</th>
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
}
</script>
  