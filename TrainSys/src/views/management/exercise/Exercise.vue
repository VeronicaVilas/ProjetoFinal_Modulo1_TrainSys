<template>
  <v-form>
    <v-text-field
    label="" 
    placeholder="Insira o nome do exercício para cadastro" 
    type="text"
    v-model="description"
    variant="outlined"  
    />
  
    <v-btn>Cadastrar</v-btn>
  </v-form>
  
  <v-table >
    <thead>
      <tr>
        <th>Nome</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="exercises in exerciseList" :key="exercises.id"> 
        <td>{{ exercises.description }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
export default {
  data() {
    return {
      description: "",
      exerciseList: [],
    }
  }
}
</script>
  