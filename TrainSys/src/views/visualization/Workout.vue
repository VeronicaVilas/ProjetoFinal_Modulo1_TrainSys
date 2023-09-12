<template>
  <router-view></router-view>

  <div>
    <h1>Visualização de Treinos</h1>

    <div>
      <p> Dados do aluno</p>
      <p>Matrícula: {{ student_id }}</p>
      <p>Nome: {{ this.$route.query.title }}</p>
    </div>

    <div>
      <p>Hoje, {{ selectedDay }}</p>
      <v-card>
        <v-card-text v-for="workout in markTrainingList" :key="workout.id">
          <v-checkbox>
            <template v-slot:label>
              {{ workout.exercise_description }} | {{  workout.weight }} kg | {{ workout.repetitions }} repetições | {{ workout.break_time }} segundos de pausa
            </template>
          </v-checkbox>
        </v-card-text>
      </v-card>
    </div>
  </div>

  <div>
    <div class="day-filter">
      <button @click="filterByDay('domingo')">Domingo</button>
      <button @click="filterByDay('segunda')">Segunda-feira</button>
      <button @click="filterByDay('terca')">Terça-feira</button>
      <button @click="filterByDay('quarta')">Quarta-feira</button>
      <button @click="filterByDay('quinta')">Quinta-feira</button>
      <button @click="filterByDay('sexta')">Sexta-feira</button>
      <button @click="filterByDay('sabado')">Sábado</button>
    </div>

    <v-table>
      <thead>
        <tr>
          <th class="subtitle-table">Nome</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="workout in filtrateTrainingList" :key="workout.id">
          <td>{{ workout.exercise_description }} | {{  workout.weight }} kg | {{ workout.repetitions }} repetições | {{ workout.break_time }} segundos de pausa</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      student_id: this.$route.params.id,
      selectedWorkouts: [],
      trainingList: [],
      selectedDay: this.getCurrentDay(),
      trainingDays: this.getCurrentDay(),
    };
  },

  computed: {
    markTrainingList() {
      if (!this.selectedDay) {
        return this.trainingList;
      }
      return this.trainingList.filter((workout) => workout.day === this.selectedDay);
    },

    filtrateTrainingList() {
      if (!this.trainingDays) {
        return this.trainingList;
      }
      return this.trainingList.filter((workout) => workout.day === this.trainingDays);
    },
  },

  methods: {
    getCurrentDay(){
      const value = new Date().getDay()
      
      const daysWeek = [
        {value: 'domingo', number: 0},
        {value: 'segunda', number: 1},
        {value: 'terca', number: 2},
        {value: 'quarta', number: 3},
        {value: 'quinta', number: 4},
        {value: 'sexta', number: 5},
        {value: 'sabado', number: 6}
      ]
      const option = daysWeek.find(item => item.number === value)

      return option.value
    },

    filterByDay(day) {
      this.trainingDays = day;
    },
  },

  mounted() {
    axios({
      url: `http://localhost:3000/workouts?student_id=${this.$route.params.id}`,
      method: 'GET',
    })
    .then((response) => {
      this.trainingList = response.data.workouts
    })
    .catch(() => {
      alert('Erro ao carregar lista de alunos cadastrados.');
    });
  },
};
</script>

<style scoped>
.day-filter {
  margin-top: 20px;
}

.day-filter button {
  margin-right: 10px;
}
</style>