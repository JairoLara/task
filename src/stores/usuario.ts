import { defineStore } from 'pinia';

interface User {
  id: string;
  email: string;
  password: string;
}

export const usuarioAPI = defineStore('user', {
  state: () => ({
    users: JSON.parse(localStorage.getItem('users') || '[]') as User[],
    currentUser: null as User | null,
  }),
  actions: {
    registrarusuario(email: string, password: string) {
      
      const userExists = this.users.some(user => user.email === email);
      if (userExists) {
        throw new Error('El usuario ya está registrado.');
      }

      const newUser: User = {
        id: Date.now().toString(),
        email,
        password,
      };
      this.users.push(newUser);
      this.saveUsers();
    },

    loginUser(email: string, password: string) {
    
      const user = this.users.find(user => user.email === email && user.password === password);
      if (!user) {
        throw new Error('Credenciales incorrectas.');
      }
      this.currentUser = user;
    },

    logoutUser() {
      this.currentUser = null;
    },

    saveUsers() {
      localStorage.setItem('users', JSON.stringify(this.users)); 
    },
  },
});