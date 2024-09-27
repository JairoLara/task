import { defineStore } from 'pinia';

interface Task {
  title: string;
  description: string;
  category: string;
  priority: string;
  status: string; 
  userId: 16;
  startDate: string;
  endDate: string;
}

export const TareaAPI = defineStore('task', {
  state: () => ({
    task: JSON.parse(localStorage.getItem('tasks') || '[]') as Task[],
    currentUserId: null as string | null,
  }),
  actions: {
    setCurrentUser(email: string) {
      this.currentUserId = email;
    },
    addTask(task: Task) {
      if (this.currentUserId) {
        task.userId = this.currentUserId; // Establecer el userId de la tarea
      }
      this.task.push(task); 
      this.saveTasks(); 
    },
    editTask(updatedTask: Task) {
      const index = this.task.findIndex(task => task.title === updatedTask.title);
      if (index !== -1) {
        this.task[index] = updatedTask;
        this.saveTasks(); 
      }
    },
    deleteTask(title: string) {
      this.task = this.task.filter(task => task.title !== title);
      this.saveTasks(); 
    },
    getUserTasks() {
      return this.task.filter(task => task.userId === this.currentUserId) || [];
    },
    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.task)); 
    },
    updateTaskStatus(task: Task) {
      const index = this.task.findIndex(t => t.title === task.title && t.userId === task.userId);
      if (index !== -1) {
        this.task[index].status = task.status; 
        this.saveTasks(); 
      }
    },
  },
});