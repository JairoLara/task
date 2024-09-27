<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <div class="modal">
      <h2>{{ task ? 'Asignar Tarea' : 'Agregar tarea' }}</h2>
      <form @submit.prevent="handleSubmit">
        <label for="title" style="display: block;">Título:</label>
        <input v-model="task.title" id="title" type="text" required />

        <label for="description" style="display: block;">Descripción:</label>
        <textarea v-model="task.description" id="description" required></textarea>

        <div style="display: block; margin-top: 10px;">
          <label for="category">Categoría:</label>
          <select v-model="task.category" id="category">
            <option value="escuela">Escuela</option>
            <option value="hogar">Hogar</option>
            <option value="trabajo">Trabajo</option>
            <option value="otro">Otro</option>
          </select>

          <label for="status">Estado:</label>
          <select v-model="task.status" id="status">
            <option value="creado">Creado</option>
            <option value="en progreso">En Progreso</option>
            <option value="terminada">Terminada</option>
          </select>

          <!-- Nuevos campos de fecha -->
          <label for="startDate">Inicio:</label>
          <input v-model="task.startDate" id="startDate" type="date" required />

          <label for="endDate">Fin:</label>
          <input v-model="task.endDate" id="endDate" type="date" required />
        </div>

        <button type="submit" style="margin-top: 10px;">{{ task ? 'Crear' : 'Agregar Tarea' }}</button>
      </form>
      <button @click="closeModal" style="position: fixed; top: 29%; right: 30%;">X</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  props: {
  isVisible: {
    type: Boolean,
    required: true,
  },
  task: {
    type: Object as () => Task | null, // Permite que sea un objeto o null
    default: null, // Valor por defecto si no se proporciona
  },
},
  emits: ['close', 'add-task', 'edit-task'],
  setup(props, { emit }) {
  const task = ref({
    title: '',
    description: '',
    category: 'otro',
    priority: 'media',
    status: 'Creado',
    startDate: '',
    endDate: '',
  });

  // Si props.task está disponible, copiarla a la tarea actual
  watch(
    () => props.task,
    (newTask) => {
      if (newTask) {
        task.value = { ...newTask };
      } else {
        task.value = {
          title: '',
          description: '',
          category: 'otro',
          priority: 'media',
          status: 'Creado',
          startDate: '',
          endDate: '',
        };
      }
    },
    { immediate: true }
  );

  const closeModal = () => {
    emit('close');
  };

  const handleSubmit = () => {
  if (props.task) {
    emit('edit-task', task.value); 
  } else {
    emit('add-task', task.value); 
  }
  // Reiniciar el formulario
  task.value = {
    title: '',
    description: '',
    category: 'otro',
    priority: 'media',
    status: 'creado',
    startDate: '', 
    endDate: '', 
  };
  closeModal();
};

  return {
    task,
    closeModal,
    handleSubmit,
  };
}
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal{
  background-color: rgba(0, 0, 0, 0.5);
  border: 2px solid cyan;
  border-radius: 5px;
}
.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
}
</style>