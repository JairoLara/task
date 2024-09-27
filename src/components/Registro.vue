<template>
    <div>
      <h1>Registro</h1>
      <hr>
      <form @submit.prevent="registro">
        <label for="email" style="display: block;">Email:</label>
        <input v-model="email" id="email" type="email" required />
  
        <label for="password" style="display: block;">Contraseña:</label>
        <input v-model="password" id="password" type="password" required />
        
        <router-link to="/login">
        <a class="login" style="display: block;">Tienes una cuenta?</a>
      </router-link>
      <div><button type="submit">Registrar</button></div>
        
      </form>
      <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { usuarioAPI } from '../stores/usuario';
  
  export default defineComponent({
    setup() {
      const email = ref('');
      const password = ref('');
      const errorMessage = ref('');
      const usuario = usuarioAPI();
  
      const registro = () => {
        try {
          usuario.registrarusuario(email.value, password.value);
          errorMessage.value = '';
          alert('Usuario registrado.');
        } catch (error: any) {
          errorMessage.value = error.message;
        }
      };
  
      return {
        email,
        password,
        registro,
        errorMessage,
      };
    },
  });
  </script>