import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import {createRouter, createWebHistory} from 'vue-router'
import PrivacyPolicy from './components/PrivacyPolicy.vue'
import RequestDeleteAccount from './components/RequestDeleteAccount.vue'
import RequestDeletePost from './components/RequestDeletePost.vue'

import DeleteAccount from './components/DeleteAccount.vue'
import DeletePost from './components/DeletePost.vue'

const routes = [
  {path: '/privacypolicy', component: PrivacyPolicy},
  {path: '/requestdeleteaccount', component: RequestDeleteAccount},
  {path: '/requestdeletepost', component: RequestDeletePost},
  {path: '/deleteaccount', component: DeleteAccount},
  {path: '/deletepost', component: DeletePost}
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')
