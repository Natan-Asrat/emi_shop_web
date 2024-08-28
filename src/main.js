import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import {createRouter, createWebHistory} from 'vue-router'
import PrivacyPolicy from './components/PrivacyPolicy.vue'
import RequestDeleteAccount from './components/RequestDeleteAccount.vue'
import RequestDeletePost from './components/RequestDeletePost.vue'

import DeleteAccount from './components/DeleteAccount.vue'
import DeletePost from './components/DeletePost.vue'
import ContactUS from './components/ContactUs.vue'
import Posts from './components/Posts.vue'
import Post from './components/Post.vue'
import Home from './components/Home.vue'
import Categories from './components/Categories.vue'
import Packages from './components/Packages.vue'


import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const routes = [
  {path: '/privacypolicy', component: PrivacyPolicy},
  {path: '/requestdeleteaccount', component: RequestDeleteAccount},
  {path: '/requestdeletepost', component: RequestDeletePost},
  {path: '/deleteaccount', component: DeleteAccount},
  {path: '/deletepost', component: DeletePost},
  {path: '/contact', component: ContactUS},
  { path: '/posts/:categoryId?', component: Posts, name: 'posts' }, // Make categoryId optional
  { path: '/post', component: Post },
  {path: '/categories', component: Categories},
  {path: '/packages', component: Packages},
  {path: '/', component: Home}
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')
