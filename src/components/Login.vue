<template>
  <div>
    <h1 style="margin-bottom: -10px;">Iniciar Sesión</h1>
    <form @submit.prevent="login" style="margin-top: 10px;">
      <hr>
      <input v-model="email" type="email" placeholder="Correo electrónico" required />
      <button type="submit" style="margin-left: 10px;">Iniciar Sesión</button>
      <router-link to="/registro">
        <a class="login" style="display: block;">No tienes una cuenta?</a>
      </router-link>
      <p v-if="errorMessage" style="color: red; margin-top: 10px;">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { TareaAPI } from '../stores/pinia';
import { usuarioAPI } from '../stores/usuario';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const tarea = TareaAPI();
    const usuario = usuarioAPI();
    const router = useRouter();
    const email = ref('');
    const errorMessage = ref('');

    const login = () => {
      const user = usuario.users.find(u => u.email === email.value);
      
      if (user) {
        tarea.setCurrentUser(email.value);
        router.push('/dashboard');
      } else {
        errorMessage.value = 'El usuario no está registrado.';
      }
    };
    return { email, login, errorMessage };
  },
});
</script>