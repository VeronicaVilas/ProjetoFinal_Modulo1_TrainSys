<template>
  <h1>Login</h1>

  <v-form @submit.prevent="handleSubmitLogin">
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

    <v-btn class="button-form" size="large" type="submit">Entrar</v-btn>
  </v-form>

  <p class="mb-2">Ainda não tem conta? 
    <router-link to="/cadastro/usuario" class="register"> Cadastre-se</router-link>
  </p>
</template>

<script>
import * as yup from 'yup'
import { captureErrorYup } from '../../utils/captureErrorYup'
import axios from 'axios'

export default {
  data() {
    return {
      email: "",
      password: "",
      passwordVisibility: false,

      errorValidation: {},
    }
  },

  methods: {
    handleSubmitLogin() {
      try {
        const schema = yup.object().shape({
          email: yup.string().email('O Email inserido não é valido').required('O email é obrigatório'),
          password: yup.string().required('A senha é obrigatória'),
        })
        schema.validateSync (
          {
            email: this.email,
            password: this.password,
          },
          { abortEarly:false }
        )

        axios ({
          url: 'http://localhost:3000/sessions',
          method: 'POST',
          data: {
            email: this.email,
            password: this.password,
          }
          })
          .then((response) => {
            localStorage.setItem("TrainSys_login_name", response.data.name)

            this.$router.push('/dashboard')
          })
          .catch(() => {
            alert('Usuário e/ou senha incorretos! Tente novamente ou clique em cadastre-se para criar uma conta.')})

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