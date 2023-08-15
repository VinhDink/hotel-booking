import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SigninView from '../views/SigninView.vue'
import RegisterView from '../views/RegisterView.vue'
import CreateBookingView from '../views/CreateBookingView.vue'
import MyAccountView from '../views/MyAccountView.vue'
import MyBookingView from '../views/MyBookingView.vue'
import DefaultLayout from '@/layouts/default.vue'
import RoomDetail from '@/views/RoomDetail.vue'
import AboutUsView from '@/views/AboutUsView.vue'
import PolicyView from '@/views/PolicyView.vue'
import VerifyEmail from '@/views/VerifyEmail.vue'
import ResetPasswordView from '@/views/ResetPasswordView.vue'


const routes = [
  {
    path: '/',
    name: 'default-layout',
    component: DefaultLayout,
    children: [
      {
        path: '/',
        name: 'home',
        component: HomeView
      },
      {
        path: '/policy',
        name: 'policy',
        component: PolicyView
      },
      {
        path: '/about-us',
        name: 'about-us',
        component: AboutUsView
      },
      {
        path: '/signin',
        name: 'signin',
        component: SigninView
      },
      {
        path: '/register',
        name: 'register',
        component: RegisterView
      },
      {
        path: '/create-booking/:id',
        name: 'create-booking',
        component: CreateBookingView
      },
      {
        path: '/my-account',
        name: 'my-account',
        component: MyAccountView
      },
      {
        path: '/my-booking',
        name: 'my-booking',
        component: MyBookingView
      },
      {
        path: '/room-detail/:id',
        name: 'room-detail',
        component: RoomDetail
      },
      {
        path: '/verify-email',
        name: 'verify-email',
        component: VerifyEmail
      },
      {
        path: '/reset-password/:token',
        name: 'reset-password',
        component: ResetPasswordView
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isLoggedIn');
  if (to.path !== '/signin' && to.path !== '/register' && to.path !== '/' && !to.path.includes('/reset-password/') && to.path !=='/verify-email' && !isAuthenticated )  {
    next('/signin')
  } else {
    next()
  }
})

export default router
