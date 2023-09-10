<template>
  <h1>Cadastro de alunos</h1>

  <hr>

  <v-form @submit.prevent="handleSubmitNewStudent">

    <div >

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
    label="Contato" 
    placeholder="Insira o telefone para contato" 
    type="number"
    v-model="contact"
    variant="outlined"
    />

    <v-text-field
    label="Data de nascimento" 
    placeholder="Insira a data de nascimento" 
    type="date"
    v-model="date_birth"
    variant="outlined"
    />
    </div>

    <p>Endereço:</p>

    <hr>

    <div>
      <v-text-field
      label="CEP" 
      placeholder="CEP" 
      type="number"
      v-model="cep"
      variant="outlined"
      />

      <v-text-field
      label="Logradouro" 
      placeholder="Logradouro" 
      type="text"
      v-model="street"
      variant="outlined"
      />

      <v-text-field
      label="Número" 
      placeholder="Número da residência" 
      type="number"
      v-model="number"
      variant="outlined"
      />

      <v-text-field
      label="Bairro" 
      placeholder="Bairro" 
      type="text"
      v-model="neighborhood"
      variant="outlined"
      />

      <v-text-field
      label="Cidade" 
      placeholder="Cidade" 
      type="text"
      v-model="city"
      variant="outlined"
      />

      <v-text-field
      label="Estado" 
      placeholder="UF" 
      type="text"
      v-model="province"
      variant="outlined"
      />

      <v-text-field
      label="Complemento" 
      type="text"
      v-model="complement"
      variant="outlined"
      />
    </div>

    <div>
      <v-btn size="x-large" type="submit">Cadastrar</v-btn>
    </div>
    </v-form>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      contact: "",
      date_birth: "",
      cep: "",
      number: "",
      complement: "",
      street: "",
      neighborhood: "",
      city: "",
      province: "",
    }
  },
}
</script>