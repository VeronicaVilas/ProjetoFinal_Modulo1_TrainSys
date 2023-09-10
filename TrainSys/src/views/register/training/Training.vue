<template>
    <h1>Treino</h1>
    <p>Matrícula: {{ this.$route.params.id }}</p>
    <p>Nome: {{ this.$route.query.title }}</p>
  
    <v-form>
      <v-select
      label="Qual o exercício?" 
      placeholder="Escolha o exercicio" 
      :items="exercises" 
      item-title="description"
      item-value="id"
      type="text"
      v-model="exercise_id"
      class="w-25 px-2" variant="outlined"
      />
  
      <v-text-field
      label="Repetições" 
      placeholder="Insira o número de repetições" 
      type="number"
      v-model="repetitions"
      class="w-25 px-2" variant="outlined" 
      />
  
      <v-text-field
      label="Peso" 
      placeholder="Insira a quantidade de peso" 
      type="number"
      v-model="weight"
      suffix="kg"
      class="w-25 px-2" variant="outlined" 
      />
  
      <v-text-field
      label="Tempo de pausa" 
      placeholder="Insira o tempo da pausa" 
      type="time"
      v-model="break_time"
      class="w-25 px-2" variant="outlined" 
      />
  
      <v-select
      label="Dia da semana" 
      :items="week" 
      item-title="dayWeek" 
      item-value="value" 
      type="text"
      v-model="day"
      class="w-25 px-2" variant="outlined"
      />
  
      <v-text-field
      label="" 
      placeholder="Observações para o treino" 
      type="text"
      v-model="observations"
      class="w-25 px-2" variant="outlined" 
      />
  
      <v-btn color="success" class="mt-1 me-2" size="large" type="submit">Cadastrar</v-btn>
    </v-form>
</template>

<script>
export default {
  data() {
    return {
      student_id: this.$route.params.id,
      repetitions: "",
      weight: "",
      break_time: "",
      observations: "",
      day: "segunda",
      week:
      [
        {dayWeek: 'Segunda-feira', value: 'segunda'},
        {dayWeek: 'Terça-feira', value: 'terca'},
        {dayWeek: 'Quarta-feira', value: 'quarta'},
        {dayWeek: 'Quinta-feira', value: 'quinta'},
        {dayWeek: 'Sexta-feira', value: 'sabado'},
        {dayWeek: 'Domingo', value: 'domingo'},
      ],
      exercises: [],
      exercise_id: "",
    }
  },
}
</script>