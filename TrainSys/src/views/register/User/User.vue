<template>
  <h1>Crie sua conta</h1>
    <v-form>
      <v-text-field
      label="Nome completo" 
      placeholder="Insira o nome completo" 
      type="text"
      v-model="name"
      variant="outlined" 
      />
  
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
      type="password"
      v-model="password"
      variant="outlined"
      />
  
      <v-text-field
      label="Confirme a senha" 
      placeholder="Insira a senha novamente" 
      type="password"
      v-model="passwordConfirmation"
      variant="outlined"
      />
  
      <v-select
      label="Qual o plano?" 
      placeholder="Escolha o plano que deseja" 
      :items="plans" 
      item-title="plan" 
      item-value="value" 
      type="text"
      variant="outlined"
      />
          
      <v-btn type="submit">Cadastrar</v-btn>
    </v-form>
</template>

<script>
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
    }
  }
}
</script>