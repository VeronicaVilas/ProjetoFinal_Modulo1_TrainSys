<template>
  <h1>Crie sua conta</h1>
    <v-form @submit.prevent="handleSubmitUser">
      <v-text-field
      label="Nome completo" 
      placeholder="Insira o nome completo" 
      type="text"
      v-model="name"
      :error-messages="this.errorValidation.name"
      variant="outlined" 
      />
  
      <v-text-field
      label="Email" 
      placeholder="Insira o email" 
      type="email"
      v-model="email"
      :error-messages="this.errorValidation.email"
      variant="outlined"
      />
  
      <v-text-field
      label="Senha"
      placeholder="Insira a senha"
      v-model="password"
      :type="passwordVisibility ? 'text' : 'password'"
      :error-messages="this.errorValidation.password"
      variant="outlined"
      :append-inner-icon="passwordVisibility ? 'mdi-eye-off' : 'mdi-eye'"
      @click:append-inner="passwordVisibility = !passwordVisibility"
      />

      <v-text-field
      label="Confirme a senha" 
      placeholder="Insira a senha novamente" 
      :type="passwordConfirmationVisibility ? 'text' : 'password'"
      v-model="passwordConfirmation"
      :error-messages="this.errorValidation.passwordConfirmation"
      variant="outlined"
      :append-inner-icon="passwordConfirmationVisibility ? 'mdi-eye-off' : 'mdi-eye'"
      @click:append-inner="passwordConfirmationVisibility = !passwordConfirmationVisibility"
      />
  
      <v-select
      label="Qual o plano?" 
      placeholder="Escolha o plano que deseja" 
      :items="plans" 
      item-title="plan" 
      item-value="value" 
      type="text"
      v-model="type_plan"
      :error-messages="this.errorValidation.type_plan"
      variant="outlined"
      />
          
      <v-btn type="submit">Cadastrar</v-btn>

    </v-form>
</template>

<script>
import * as yup from 'yup'
import { captureErrorYup } from '../../../utils/captureErrorYup'
import axios from 'axios'

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      type_plan: "bronze",
      plans:
      [
        {plan: 'Bronze', value: 'bronze'},
        {plan: 'Prata', value: 'silver'},
        {plan: 'Ouro', value: 'gold'},
      ],

      errorValidation: {},
      passwordVisibility: false,
      passwordConfirmationVisibility: false
    }
  },

  methods: {
    handleSubmitUser() {
      try {
        const schema = yup.object().shape({
          name: yup
          .string()
          .min(2, 'O nome precisa ser maior que 2 caracteres')
          .required('O nome é obrigatório'),
          email: yup.string().email('O Email inserido não é valido').required('O email é obrigatório'),
          password: yup
            .string()
            .min(8, 'A senha precisa ser maior que 8 caracteres')
            .max(20, 'A senha precia ter entre 8 e 20 caracteres')
            .required('A senha é obrigatória'),
          passwordConfirmation: yup
            .string()
            .required('A confirmação da senha necessária')
            .oneOf([yup.ref('password')], 'As senhas devem coincidir'),
          type_plan: yup.string().required('A escolha do plano é obrigatória'),
        })
        schema.validateSync (
          {
            name: this.name,
            email: this.email,
            password: this.password,
            passwordConfirmation: this.passwordConfirmation,
            type_plan: this.type_plan
          },
          { abortEarly:false }
        )

        axios ({
          url: 'http://localhost:3000/users',
          method: 'POST',
          data: {
            name: this.name,
            email: this.email,
            password: this.password,
            type_plan: this.type_plan
          }
          })
          .then(() => {
            alert('Usuário cadastrado com sucesso!')
            this.$router.push('/')
          })
          .catch(() => {
            alert('Não foi possível criar a conta nesse momento, por favor, tente novamente mais tarde.')})

      } catch (error) {
          if (error instanceof yup.ValidationError) {
            console.log(error)

            this.errorValidation = captureErrorYup(error)
          }
      }
    }
  }
}
</script>