<template>

  <div>
    <div class="d-flex">
      <v-icon class="icon ml-4 mt-2" icon="mdi-account-eye" size="x-large"></v-icon>
      <div class="d-flex flex-column ml-3">
        <h1 class="title mt-3">Vizualização de treinos semanais</h1>
        <p>Matrícula: {{ student_id }}</p>
        <p>Nome: {{ this.$route.query.title }}</p>
      </div>
    </div>

    <hr>

    <div>
      <h2 class="ml-6 mt-3">Hoje, {{ selectedDay.text }}</h2>
      <v-card class="d-flex flex-column">
        <v-card-text v-for="workout in markTrainingList" :key="workout.id">
          <v-checkbox class="checkbox" v-model="markedWorkouts" :value="workout.id" @click="handleSubmitCheckbox(workout)">
            <template v-slot:label>
              {{ workout.exercise_description }} | {{  workout.weight }} kg | {{ workout.repetitions }} repetições | {{ workout.break_time }} segundos de pausa
            </template>
          </v-checkbox>
        </v-card-text>
      </v-card>
    </div>
  </div>

  <div>
    <div class="weekDay">
      <v-btn class="button-weekDay" :height="50" rounded="0" @click="filterByDay('domingo')">Domingo</v-btn>
      <v-btn class="button-weekDay" :height="50" rounded="0" @click="filterByDay('segunda')">Segunda-feira</v-btn>
      <v-btn class="button-weekDay" :height="50" rounded="0" @click="filterByDay('terca')">Terça-feira</v-btn>
      <v-btn class="button-weekDay" :height="50" rounded="0" @click="filterByDay('quarta')">Quarta-feira</v-btn>
      <v-btn class="button-weekDay" :height="50" rounded="0" @click="filterByDay('quinta')">Quinta-feira</v-btn>
      <v-btn class="button-weekDay" :height="50" rounded="0" @click="filterByDay('sexta')">Sexta-feira</v-btn>
      <v-btn class="button-weekDay" :height="50" rounded="0" @click="filterByDay('sabado')">Sábado</v-btn>
    </div>

    <v-table class="table d-flex flex-column" density="compact">
      <thead>
        <tr class="title-table">
          <th class="text-center">Nome do exercício</th>
          <th class="text-center">Peso (kg)</th>
          <th class="text-center">Quantidade de repetições</th>
          <th class="text-center">Tempo de pausa (segundos)</th>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr v-for="workout in filtrateTrainingList" :key="workout.id">
          <td>{{ workout.exercise_description }}</td>
          <td>{{  workout.weight }}</td>
          <td>{{ workout.repetitions }}</td>
          <td>{{ workout.break_time }}</td>
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
      markedWorkouts: [],
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
      return this.trainingList.filter((workout) => workout.day === this.selectedDay.value);
    },

    filtrateTrainingList() {
      if (!this.trainingDays) {
        return this.trainingList;
      }
      return this.trainingList.filter((workout) => workout.day === this.trainingDays.value);
    },
  },

  methods: {
    getCurrentDay(){
      const value = new Date().getDay()
      
      const daysWeek = [
        {value: 'domingo', text: 'Domingo', number: 0},
        {value: 'segunda', text: 'Segunda-feira', number: 1},
        {value: 'terca', text: 'Terça-feira', number: 2},
        {value: 'quarta', text: 'Quarta-feira', number: 3},
        {value: 'quinta', text: 'Quinta-feira', number: 4},
        {value: 'sexta', text: 'Sexta-feira', number: 5},
        {value: 'sabado', text: 'Sábado', number: 6}
      ]
      const option = daysWeek.find(item => item.number === value)

      return {
        value: option ? option.value : '',
        text: option ? option.text : '',
      }
    },

    filterByDay(day) {
      this.trainingDays.value = day;
    },

    handleSubmitCheckbox(workout) {
      axios({
        url: 'http://localhost:3000/workouts/check',
        method: 'POST',
        data: {
          workout_id: workout.id,
          student_id: this.student_id,
          day_of_week: this.selectedDay,
        },
      })
        .then(() => {
          console.log('Exercício finalizado com sucesso!');
        })
        .catch(() => {
          console.log('Erro na marcação de exercício finalizado com sucesso!');
        });
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
  .title {
    text-transform: uppercase;
    font-size: 32px;
  }
  .icon {
    font-size: 100px;
  }

  hr{
  border: 1px solid;
  }
  .checkbox {
    margin-bottom: 15px;
    height: 15px;
  }

  .title-table {
    font-size: 18px;
  }
  .weekDay {
    display: flex;
    justify-content: center;

    margin-top: 10px;
  }
  .button-weekDay {
    width: 210px;

    text-transform: uppercase;
    font-weight: bold;
    font-size: 16px;

    background: linear-gradient(80deg, #1976D2, #1337B4);

    cursor: pointer;
  }

  .button-weekDay:hover {
    background: black;
    color: white;
    box-shadow: 0 0 30px rgba(19, 55, 180, .5);
  }
</style>