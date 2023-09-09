<template>
  <h1>Login</h1>

  <v-form @submit.prevent="handleSubmitUser">
    <v-text-field
    label="Email" 
    placeholder="Insira o email" 
    type="email"
    v-model="email"
    variant="outlined"
    />

    <v-text-field
    label="Senha"
    placeholder="Insira a senha"
    v-model="password"
    :type="passwordVisibility ? 'text' : 'password'"
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

export default {
  data() {
    return {
      email: "",
      password: "",
      passwordVisibility: false,
    }
  }
}
</script>