<template>
  <div class="container">

    <div class="header d-flex">
      <v-icon class="icon mt-4 ms-5" icon="mdi-weight-lifter" size="small"></v-icon>
      <p class="title mt-3" >rainSys</p>    
    </div>

    <div class="container-box">
      <div class="container-box-left">

        <div class="register">
          <h1 class="text-center mb-3">Conecte-se!</h1>
          <p class="mb-4 ml-4">Para se manter conectado conosco, faça login com suas informações pessoais previamente cadastradas</p>
          <router-link to="/">
            <v-btn class="btn-register" color="black" size="large" variant="outlined" prepend-icon="mdi-lock-outline">Login</v-btn>
          </router-link>
        </div>

      </div>
      <div class="container-box-right">
        <div>
          <h1 class="subtitle mx-2">Crie sua conta</h1>
        </div>

        <div class="form">
          <v-form @submit.prevent="handleSubmitUser">
          <v-text-field
          label="Nome completo" 
          placeholder="Insira o nome completo" 
          type="text"
          v-model="name"
          :error-messages="this.errorValidation.name"
          variant="outlined" 
          class="mb-1"
          />
      
          <v-text-field
          label="Email" 
          placeholder="Insira o email" 
          type="email"
          v-model="email"
          :error-messages="this.errorValidation.email"
          variant="outlined"
          class="mb-1"
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
          class="mb-1"
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
          class="mb-1"
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
              
          <v-btn class="btn" size="large" type="submit">Cadastrar</v-btn>
        </v-form>
        </div>
      </div>
    </div>
  </div>
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

<style scoped>
  .container {
    width: 100%;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;

    background-image: url(../../../images/background.jpg);
    background-size: 100%;
  }

  .container-box {
    width: 70%;
    height: 80vh;

    display: flex;
  }

  .container-box-left {
    width: 40%;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: transparent;
    border: 2px solid rgba(255, 255, 255, .5);
    backdrop-filter: blur(10px);
  }

  .container-box-right{
    width: 60%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: #fff;
    border: 2px solid rgba(255, 255, 255, .5);
    box-shadow: 0 0 30px rgba(0, 0, 0, .5);
  }

  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
  .title {
    display: flex;
    margin-left: -10px;

    font-size: 40px;
    font-family: 'Black Ops One';

    color: white;
  }

  .icon {
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
  .btn-register {
    font-weight: bold;
    cursor: pointer;
  }
  .btn-register:hover {
    background: linear-gradient(80deg, #1976D2, #1337B4);
    box-shadow: 0 0 30px rgba(0, 0, 0, .5);
  }
  .form {
    width: 50%;
  }
  .btn {
    width: 100%;
    margin-top: -12px;

    text-transform: lowercase;
    font-weight: bold;
    font-size: 18px;

    background: linear-gradient(80deg, #1976D2, #1337B4);
    cursor: pointer;
  }

  .btn:hover {
    background: black;
    color: white;
    box-shadow: 0 0 30px rgba(19, 55, 180, .5);
  }

</style>