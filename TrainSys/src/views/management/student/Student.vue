<template>
  <div class="d-flex justify-space-between">
    <div class="d-flex">
      <img :width="100" src="../../../images/Students.png" alt="">
      <h1 class="title mt-13 ml-2">Alunos</h1>
    </div>

    <router-link to="/cadastro/novo-aluno">
      <v-btn class="button-newStudent mt-13 ma-2" title="Clique para cadastrar novo aluno"  size="large" prepend-icon="mdi-account-plus" type="submit">Novo</v-btn>
    </router-link>
  </div>

  <hr>

  <v-form  class="d-flex ma-2 mt-6" @submit.prevent="handleSubmitStudents">
    <v-text-field
    label=""
    placeholder="Insira o nome do aluno para pesquisar"
    type="text"
    v-model="name"
    variant="outlined"
    :append-inner-icon="'mdi-account-search'"
    />
  </v-form>

  <v-table class="student-table" density="compact">
    <thead>
      <tr>
        <th class="title-table">Matrícula</th>
        <th class="title-table">Nome</th>
        <th class="title-table">Ações</th>
        </tr>
    </thead>
    <tbody>
      <tr v-for="student in searchNameStudentsList" :key="student.id">
        <td>{{ student.id }}</td>
        <td>{{ student.name }}</td>
        <td>
          <v-btn 
          class="button-training mt-1 me-6"
          color="black" 
          variant="outlined"
          title="Clique para montar um treino" 
          prepend-icon="mdi-dumbbell" 
          type="submit" 
          @click="() => redirectStudentInformationTraining(student)">
          Treinos
          </v-btn>

          <v-btn 
          class="button-view"
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

<style scoped>
  .title {
    text-transform: uppercase;
    font-size: 32px;
  }

  hr{
    border: 1px solid;
  }

  .button-newStudent {
    width: 120px;

    font-weight: bold;
    font-size: 18px;

    background: linear-gradient(80deg, #1976D2, #1337B4);
    cursor: pointer;
  }

  .button-newStudent:hover {
    background: black;
    color: white;
    box-shadow: 0 0 30px rgba(19, 55, 180, .5);
  }

  .title-table {
    font-size: 22px;
    background:#1976D2;
  }

  .student-table tbody tr:nth-child(even) {
    background-color: #E3F2FD;
  }

  .button-training {
    font-weight: bold;
    cursor: pointer;
  }
  .button-training:hover {
    background: linear-gradient(80deg, #1976D2, #1337B4);
    box-shadow: 0 0 30px rgba(0, 0, 0, .5);
  }
  .button-view {
    color: black;
  }

</style>