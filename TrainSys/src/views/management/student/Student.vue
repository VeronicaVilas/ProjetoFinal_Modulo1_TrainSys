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
    :append-inner-icon="'mdi-account-search'"
    />
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
      <tr v-for="student in searchNameStudentsList" :key="student.id">
        <td>{{ student.id }}</td>
        <td>{{ student.name }}</td>
        <td>
          <v-btn 
          title="Clique para moontar um treino" 
          prepend-icon="mdi-dumbbell" 
          type="submit" 
          @click="() => redirectStudentInformationTraining(student)">
          Treinos
          </v-btn>

          <v-btn 
          title="Vizualizar treino" 
          icon="mdi-eye-outline"
          variant="text" 
          @click="() => redirectStudentInformationView(student)">
          </v-btn>
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

  computed: {
    searchNameStudentsList() {
      const query = this.name.toLowerCase().trim();
      if (!query) {
        return this.studentsList;
      }
      return this.studentsList.filter((student) => {
        return student.name.toLowerCase().includes(query);
      });
    },
  },

  methods: {
    handleSubmitStudents() {
      axios({
        url: "http://localhost:3000/students",
        method: "GET",
      })
        .then((response) => {
          this.studentsList = response.data.students
        })
        .catch(() => {
          alert("Erro procurar alunos na lista");
        });
    },

    redirectStudentInformationTraining(student) {
      this.$router.push({
        path: `/cadastro/treino/${student.id}`,
        query: {title: student.name}
      })
    },

    redirectStudentInformationView(student) {
      this.$router.push({
        path: `/visualização-de-treinos/${student.id}`,
        query: {title: student.name}
      })
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