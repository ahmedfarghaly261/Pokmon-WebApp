import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Wait for router to be ready before mounting
router.isReady().then(() => {
  app.mount('#app')
})

// Global error handler
app.config.errorHandler = (err, instance, info) => {
  console.error('Vue error:', err, info)
}
