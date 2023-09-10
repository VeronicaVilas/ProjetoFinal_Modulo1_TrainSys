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
    label="Contato" 
    placeholder="Insira o telefone para contato" 
    type="number"
    v-model="contact"
    :error-messages="this.errorValidation.contact"
    variant="outlined"
    />

    <v-text-field
    label="Data de nascimento" 
    placeholder="Insira a data de nascimento" 
    type="date"
    :max="new Date()"
    v-model="date_birth"
    :error-messages="this.errorValidation.date_birth"
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
      :error-messages="this.errorValidation.cep"
      variant="outlined"
      />
      <v-btn prepend-icon="mdi-magnify" @click="searchAddress"></v-btn>

      <v-text-field
      label="Logradouro" 
      placeholder="Logradouro" 
      type="text"
      v-model="street"
      :error-messages="this.errorValidation.street"
      variant="outlined"
      />

      <v-text-field
      label="Número" 
      placeholder="Número da residência" 
      type="number"
      v-model="number"
      :error-messages="this.errorValidation.number"
      variant="outlined"
      />

      <v-text-field
      label="Bairro" 
      placeholder="Bairro" 
      type="text"
      v-model="neighborhood"
      :error-messages="this.errorValidation.neighborhood"
      variant="outlined"
      />

      <v-text-field
      label="Cidade" 
      placeholder="Cidade" 
      type="text"
      v-model="city"
      :error-messages="this.errorValidation.city"
      variant="outlined"
      />

      <v-text-field
      label="Estado" 
      placeholder="UF" 
      type="text"
      v-model="province"
      :error-messages="this.errorValidation.province"
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
import * as yup from 'yup'
import { captureErrorYup } from '../../../utils/captureErrorYup'
import axios from 'axios'

export default {
  data() {
    return {
      name: "",
      email: "",
      contact: "",
      date_birth: new Date(),
      cep: "",
      number: "",
      complement: "",
      street: "",
      neighborhood: "",
      city: "",
      province: "",

      errorValidation: {}
    }
  },

  methods: {
    searchAddress() {
      axios({
        url: `https://viacep.com.br/ws/${this.cep}/json/`,
        method: 'GET',
      })
        .then((response) => {
          this.data = response.data;

          this.street = this.data.logradouro;
          this.neighborhood = this.data.bairro;
          this.city = this.data.localidade;
          this.province = this.data.uf;

          console.log(this.localidade);
        })
        .catch(() => {
          alert('Não foi possível localizar o endereço. por favor, tente novamente.');
        });
      },
    handleSubmitNewStudent() {
      try {
        const schema = yup.object().shape({
          name: yup.string().required('O nome é obrigatório'),
          email: yup.string().email('O email não é valido'),
          contact: yup.string().required('O telefone é obrigatório'),
          date_birth: yup.date('').max(new Date(), 'A data de nascimento não pode ser no futuro'),
          cep: yup.string().required('O CEP é obrigatório'),
          number: yup.string().required('O número da residência é obrigatório'),
          street: yup.string().required('O logradouro é obrigatório'),
          neighborhood: yup.string().required('O bairro é obrigatório'),
          city: yup.string().required('A cidade é obrigatória'),
          province: yup.string().required('O estado é obrigatório')
        })
        schema.validateSync (
          {
            name: this.name,
            email: this.email,
            contact: this.contact,
            date_birth: this.date_birth,
            cep: this.cep,
            number: this.number,
            street: this.street,
            neighborhood: this.neighborhood,
            city: this.city,
            province: this.province
          },
          { abortEarly:false }
        )

        axios ({
          url: 'http://localhost:3000/students',
          method: 'POST',
          data: {
            name: this.name,
            email: this.email,
            contact: this.contact,
            date_birth: this.date_birth,
            cep: this.cep,
            street: this.street,
            number: this.number,
            neighborhood: this.neighborhood,
            city: this.city,
            province: this.province,
            complement: this.complement
          }
          })
          .then(() => {
            alert('Aluno cadastrado com sucesso!')

            this.name = ''
            this.email = ''
            this.contact = ''
            this.date_birth = ''
            this.cep = ''
            this.street = ''
            this.number = ''
            this.neighborhood = ''
            this.city = ''
            this.province = ''
            this.complement = ''
          })
          .catch(() => {
            alert('Não foi possível cadastrar o alunos nesse momento, por favor, tente novamente mais tarde.')})
      } catch (error) {
          if (error instanceof yup.ValidationError) {
            console.log(error)

            this.errorValidation = captureErrorYup(error)
          }
      }
    },
  }
}
</script>