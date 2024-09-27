<template>
    <div style="left: 2%; top: 0%; position: absolute">
      <h2>Dashboard</h2>
    </div>
    <div style="right: 2%; top: 0%; position: absolute">
      <h2>{{ currentUserId }}</h2>
    </div>
    <div style="top: 2%; right: 20%; position: absolute;">
      <router-link to="/login">
        <button class="login">Ir a login</button>
      </router-link>
    </div>
    
    <br />
    <div>
      <button @click="showModal = true">+</button>
      <label for="statusFilter">Filtrar por estado:</label>
      <select v-model="selectedStatus" id="statusFilter">
        <option value="">Todos</option>
        <option value="creado">Creado</option>
        <option value="en progreso">En Progreso</option>
        <option value="terminada">Terminada</option>
      </select>
    </div>
    <br>
    
    <div class="task-container">
      <p v-if="filteredTasks.length === 0" style="color: aliceblue;">Sin tareas asignadas</p>
      <div class="task-card" v-for="task in filteredTasks" :key="task.title">
        <h2 class="titulotar" style="margin-bottom: -10px;">{{ task.title }}</h2>
         <hr>
         <p><strong>~</strong> {{ task.category }}</p>
         <p>{{ task.description }}</p>
         <p style="color: green;">{{ task.status }}</p>
         <p>{{ task.startDate }} | {{ task.endDate }}</p>
  
         <select v-model="task.status" @change="updateTaskStatus(task)">
           <option value="creado">Creado</option>
           <option value="en progreso">En Progreso</option>
           <option value="terminada">Terminada</option>
         </select>

  <button @click="confirmDelete(task.title)" class="elimi"><span class="material-symbols-outlined">delete</span></button>
</div>
    </div>
  
    <Tareaformulario :isVisible="showModal" @close="handleCloseModal" @add-task="handleAddTask"/>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, computed } from 'vue';
  import { TareaAPI } from '../stores/pinia';
  import Tareaformulario from './Tareaformulario.vue';

  
  export default defineComponent({
    components: {
      Tareaformulario,
    },
    setup() {
      const tarea = TareaAPI();
      const showModal = ref(false);
      const selectedStatus = ref('');
  
      const userTasks = computed(() => tarea.getUserTasks());
  
      const filteredTasks = computed(() => {
        if (!selectedStatus.value) return userTasks.value; 
        return userTasks.value.filter(task => task.status === selectedStatus.value);
      });
  
      const currentUserId = tarea.currentUserId;
  
      const handleAddTask = (newTask: { title: string; description: string; category: string; priority: string; status: string }) => {
        const taskWithUserId = {
          ...newTask,
          userId: tarea.currentUserId, 
        };
        tarea.addTask(taskWithUserId); 
        showModal.value = false;
      };
  
      const handleCloseModal = () => {
        showModal.value = false;
      };
  
      const confirmDelete = (taskTitle: string) => {
        if (confirm(`¿Estás seguro de que deseas eliminar la tarea "${taskTitle}"?`)) {
          tarea.deleteTask(taskTitle);
        }
      };
  
      return {
        userTasks,
        currentUserId,
        showModal,
        selectedStatus,
        filteredTasks,
        handleAddTask,
        handleCloseModal,
        confirmDelete,
      };
    },
  });
  </script>
  
  <style scoped>
  .task-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background: rgba(0, 0, 0, 0.3);
    gap: 20px;            
    padding: 20px;        
    border: 2px solid cyan;
    border-radius: 5px;
  }
  
  .task-card {
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 15px;
    width: 200px;
  }
  .titulotar, p{
    color: black;
  }
  .elimi{
    position: absolute;
    margin-left: 20px;
    padding: 0%;
    color: red;
    background-color: aliceblue;
  }
  </style>