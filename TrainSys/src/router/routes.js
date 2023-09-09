import {createRouter, createWebHashHistory} from 'vue-router'

import Login from '../views/login/Login.vue'
import User from '../views/register/User/User.vue'
import Dashboard from '../views/dashboard/Dashboard.vue'
import Exercise from '../views/Management/Exercise/Exercise.vue'
import Student from '../views/Management/Student/Student.vue'
import NewStudent from '../views/register/NewStudent/NewStudent.vue'
import Training from '../views/register/Training/Training.vue'
import Workout from '../views/visualization/Workout.vue'

export const routes = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/cadastro/usuario',
            name: 'User',
            component: User
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard
        },
        {
            path: '/gerenciamento/exercicios',
            name: 'Exercise',
            component: Exercise
        },
        {
            path: '/gerenciamento/alunos',
            name: 'Student',
            component: Student
        },
        {
            path: '/cadastro/novo-aluno',
            name: 'NewStudent',
            component: NewStudent
        },
        {
            path: '/cadastro/treino/:id',
            name: 'Training',
            component: Training
        },
        {
            path: '/visualização-de-treinos/:id',
            name: 'Workout',
            component: Workout
        },
    ]
  })