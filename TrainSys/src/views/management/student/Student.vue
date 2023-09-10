<template>
  <h1>Alunos</h1>
  <router-link to="/cadastro/novo-aluno">
    <v-btn prepend-icon="mdi-account-plus" type="submit">Novo</v-btn>
  </router-link>

  <hr>

  <v-form @submit.prevent="handleSubmitStudents">
    <v-text-field
    label=""
    placeholder="Insira o nome do aluno para pesquisar"
    type="text"
    v-model="name"
    variant="outlined"
    />

    <v-btn size="x-large" prepend-icon="mdi-account-search" type="submit">Buscar</v-btn>
  </v-form>

  <v-table>
    <thead>
      <tr>
        <th class="subtitle-table">Matrícula</th>
        <th class="subtitle-table">Nome</th>
        <th class="subtitle-table">Ações</th>
        </tr>
    </thead>
    <tbody>
      <tr v-for="student in studentsList" :key="student.id">
        <td>{{ student.id }}</td>
        <td>{{ student.name }}</td>
        <td>
          <v-btn title="Clique para moontar um treino" prepend-icon="mdi-dumbbell" type="submit" >
          Treinos
          </v-btn>

          <v-btn title="Vizualizar treino" variant="text" icon="mdi-eye-outline"></v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      studentsList: [],
      name: ""
    }
  },

  mounted() {
    axios({
      url: 'http://localhost:3000/students',
      method: 'GET',
    })
    .then((response) => {
      this.studentsList = response.data.students
    })
    .catch(() => {
      alert('Não foi possível carregar a lista de alunos nesse momento, por favor, tente novamente mais tarde.');
    });
  }
}
</script>