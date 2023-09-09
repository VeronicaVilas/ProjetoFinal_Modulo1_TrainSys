<template>
  <div class="container">
    <div class="logo d-flex">
      <v-icon class="logo-icon mt-4 ms-5" icon="mdi-weight-lifter" size="small"></v-icon>
      <p class="logo-title mt-3" >rainSys</p>    
    </div>

    <div class="container-box">
      <div class="container-box-left">

        <h1 class="mb-8">Crie sua conta</h1>

        <div class="form">
          <v-form @submit.prevent="handleSubmitLogin">
            <v-text-field
            label="Email" 
            placeholder="Insira o email" 
            type="email"
            v-model="email"
            :error-messages="this.errorValidation.email"
            prepend-inner-icon="mdi-email-outline"
            variant="outlined"
            class="mb-2"
            />

            <v-text-field
            label="Senha"
            placeholder="Insira a senha"
            v-model="password"
            :type="passwordVisibility ? 'text' : 'password'"
            :error-messages="this.errorValidation.password"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            :append-inner-icon="passwordVisibility ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="passwordVisibility = !passwordVisibility"
            class="mb-2"
            />    

            <v-btn class="button-form" size="large" type="submit">Entrar</v-btn>
          </v-form>
        </div>
      </div>
      <div class="container-box-right">

        <div class="register">

          <h1 class="text-center mb-4">Ainda não tem uma conta? Cadastre-se!</h1>

          <p class="mb-4 ml-4">
            A TrainSys é um site voltado para auxiliar os intrutores de academia na administração dos treinamentos 
            de seus alunos. 
            Cadastre-se e venha fazer parte do time.
          </p>

          <router-link to="/cadastro/usuario">
            <v-btn 
            class="button-register" 
            title="Ir a tela de cadastro" 
            color="black" 
            size="large" 
            variant="outlined" 
            prepend-icon="mdi-account-multiple-plus">
            Cadastre-se
          </v-btn>
          </router-link>

        </div>
      </div>
    </div>
  </div>
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
            localStorage.setItem("TrainSys_login_token", response.data.token)

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

<style scoped>
  .container {
    width: 100%;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;

    background-image: url(../../images/background.jpg);
    background-size: 100%;
  }

  .container-box {
    width: 70%;
    height: 80vh;

    display: flex;
  }

  .container-box-right {
    width: 40%;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: transparent;
    border: 2px solid rgba(255, 255, 255, .5);
    backdrop-filter: blur(10px);
  }

  .container-box-left{
    width: 60%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: #fff;
    border: 2px solid rgba(255, 255, 255, .5);
    box-shadow: 0 0 30px rgba(0, 0, 0, .5);
  }

  .logo {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
  .logo-title {
    display: flex;
    margin-left: -10px;

    font-size: 40px;
    font-family: 'Black Ops One';

    color: white;
  }

  .logo-icon {
    margin-left: -10px;

    font-size: 40px;
    font-family: 'Black Ops One';

    color: #1337B4;
  }

  .register {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .button-register {
    font-weight: bold;
    cursor: pointer;
  }
  .button-register:hover {
    background: linear-gradient(80deg, #1976D2, #1337B4);
    box-shadow: 0 0 30px rgba(0, 0, 0, .5);
  }
  .form {
    width: 50%;
  }
  .button-form {
    width: 100%;

    text-transform: lowercase;
    font-weight: bold;
    font-size: 18px;

    background: linear-gradient(80deg, #1976D2, #1337B4);
    cursor: pointer;
  }

  .button-form:hover {
    background: black;
    color: white;
    box-shadow: 0 0 30px rgba(19, 55, 180, .5);
  }

</style>