import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FaqView from '../views/FaqView.vue'
import RecomendationsView from '../views/RecomendationsView.vue'
import PlayList from '../views/PlayListView.vue'
import ResgisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',
      component: ResgisterView
    },
    {
      path: '/faq',
      name: 'faq',
      component: FaqView
    },
    {
      path: '/recomendations',
      name: 'recomendations',
      component: RecomendationsView

    },
    {
      path: '/playlist',
      name:"playlist",
      component: PlayList
    },
    {
      path: '/login',
      name:"login",
      component: LoginView
    }
  ]
})

export default router
