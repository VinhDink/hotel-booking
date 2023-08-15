<template>
  <div>
    <div class="header">
      <div class="box">
        <div class="header-box">
          <router-link to="/" class="logo">
            Booking.com
          </router-link>
          <div class="menu-box">
            <div class="language">
              <div v-if="languages">
                <span v-for="(lng, index) in Object.keys(languages)" :key="lng">
                  <a v-if="$i18next.resolvedLanguage !== lng"
                    v-on:click="$i18next.changeLanguage(lng)">
                    <span :class="languages[lng].symbol"></span>
                  </a>
                  <strong v-if="$i18next.resolvedLanguage === lng">
                    <span :class="languages[lng].symbol"></span>
                  </strong>
                  <span v-if="index < (Object.keys(languages).length - 1)">&nbsp;|&nbsp;</span>
                </span>
              </div>
            </div>
            <div class="dropdown" v-if="store.state.isLoggedIn">
              <span>
                <i class="bi bi-list user-icon menu-logo" @click="openMenu()"></i>
              </span>
              <div class="dropdown-content" id="menu">
                <div class="cancel-button-box">
                  <span class="logo">Booking.com</span>
                  <button @click="closeMenu()" class="cancel-button">X</button>
                </div>
                <div class="content">
                  <router-link to="/my-account" class="router-link" @click="closeMenu()">
                    <div class="icon">
                      <i class="bi bi-person"></i>
                      {{ $t('myAccount') }}
                    </div>
                  </router-link>
                  <router-link to="/my-booking" class="router-link" @click="closeMenu()">
                    <div class="icon">
                      <i class="bi bi-bookmark "></i>
                      {{ $t('myBooking') }}
                    </div>
                  </router-link>
                  <router-link to="#" class="router-link" @click="closeMenu()">
                    <div class="icon">
                      <i class="bi bi-info-circle"></i>
                      {{ $t('Support') }}
                    </div>
                  </router-link>
                  <router-link to="#" class="router-link" @click="closeMenu()">
                    <div class="icon">
                      <i class="bi bi-file-earmark-person"></i>
                      {{ $t('aboutUs') }}
                    </div>
                  </router-link>
                  <div @click="logout()" class="router-link">
                    <div class="icon">
                      <i class="bi bi-door-closed"></i>
                      {{ $t('logout') }}</div>
                  </div>
                </div>
                <div v-if="width < 768" class="footer">
                  <BookingFooter> </BookingFooter>
                </div>
              </div>
            </div>
            <div v-if="!store.state.isLoggedIn && currentView != '/signin'" class="signin">
              <router-link to="/signin">
                Login
              </router-link>
            </div>
          </div>
        </div>
        <div class="nav" v-if="store.state.isLoggedIn">
          <router-link to="/" class="nav-content" :class="{ 'active-route': currentView == '/' }">
            <div class="nav-content-box" id="home" >
              <i class="bi bi-house"></i>
              {{ $t('home') }}
            </div>
          </router-link>
          <router-link to="/about-us" class="nav-content" :class="{ 'active-route': currentView == '/about-us' }">
            <div class="nav-content-box" id="aboutUs" >
              <i class="bi bi-people"></i>
              {{ $t('about') }}
            </div>
          </router-link>
          <router-link to="/policy" class="nav-content" :class="{ 'active-route': currentView == '/policy' }">
            <div class="nav-content-box" id="policy">
              <i class="bi bi-file-earmark-ruled"></i>
              {{ $t('policy') }}
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watchEffect, defineComponent } from 'vue'
import BookingFooter from './BookingFooter.vue'
import router from '../router'
import store from '../store'

export default defineComponent({
  name: 'BookingHeader',
  components: {
    BookingFooter
  },

  data() {
    return {
      languages: {
        en: { nativeName: 'English', symbol: 'fi fi-gb fis' },
        vn: { nativeName: 'Tiếng Việt', symbol: 'fi fi-vn fis' },
      }
    }
  },

  setup() {
    const isLoggedIn = ref(localStorage.getItem('isLoggedIn'));

    watchEffect(() => {
      isLoggedIn.value = localStorage.getItem('isLoggedIn');
    });

    const width = ref(window.innerWidth)

    const openMenu = () => {
      document.getElementById('menu').classList.add('w100');
    }

    const closeMenu = () => {
      document.getElementById('menu').classList.remove('w100');
    }

    const logout = async () => {
      try {
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('token')

        store.commit('login', false)
        closeMenu()
        router.push('/signin')
      } catch (error) {
        console.log(error)
      }
    }

    return {
      openMenu,
      closeMenu,
      width,
      logout,
      isLoggedIn,
      store
    }
  },

  computed: {
    currentView() {
      return this.$route.path;
    },
    computedState() {
      return localStorage.getItem('isLoggedIn')
    }
  }
})

</script>


<style scoped>
.language {
  padding: 15px;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
}

.signin {
  align-self: center;
}

@media (min-width: 769px) {

  .header-box {
    display: flex;
    justify-content: space-between;
  }

  .nav {
    display: flex;
    justify-content: space-between;
    padding-top: 20px;
    margin-bottom: 20px;
  }

  .menu-box {
    display: flex;
    gap: 20px;
  }

  .active-route {
    border: 1px solid white;
    background-color: rgb(33, 73, 141);
  }

  .nav-content-box:hover {
    background-color: rgb(33, 73, 141);
  }

  .nav-content-box {
    padding: 10px;
    height: 100%;
    border-radius: 70px;
  }

  .nav-content {
    text-decoration: none;
    color: white;
    font-size: 15px;
    font-weight: bold;
    border-radius: 15px;
  }

  .header {
    background-color: rgb(3, 53, 128);
    display: flex;
  }

  .box {
    width: 80%;
    margin: auto;
    justify-content: space-between;
    display: flex;
    flex-direction: column;
  }

  .cancel-button-box {
    display: none;
  }

  .dropdown:hover .dropdown-content {
    display: block;

  }

  .dropdown {
    position: relative;
    display: inline-block;

  }

  .menu-logo {
    font-size: 30px;
    color: white;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    z-index: 1;
    box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.2);
    background-color: rgb(255, 255, 255);
    width: 170px;
    border-radius: 3px;
  }

  .icon:hover {
    background-color: rgb(203, 203, 204);
  }

  .icon {
    padding: 10px;
    display: flex;
    gap: 5px;
    color: rgb(124, 124, 124);
    cursor: pointer;
  }

  .content {
    text-decoration: none;
    display: flex;
    flex-direction: column;
  }

  .router-link {
    text-decoration: none;
    color: rgb(124, 124, 124);
  }

  .logout:hover {
    background-color: rgb(226, 44, 12);
  }

  .logo {
    font-size: 30px;
    color: rgb(255, 255, 255);
    font-weight: bold;
    text-decoration: none;
  }
}


@media (max-width: 768px) {

  .header {
    background-color: rgb(3, 53, 128);
    display: flex;
    padding: 10px;
  }

  .box {
    width: 100%;
  }

  .header-box {
    display: flex;
    justify-content: space-between;
  }

  .logo {
    font-size: 20px;
    color: rgb(255, 255, 255);
    font-weight: bold;
    text-decoration: none;
  }

  .menu-logo {
    font-size: 30px;
    color: white;
  }

  .menu-box {
    display: flex;
    gap: 20px;
  }

  .nav {
    display: flex;
    justify-content: space-between;
    padding-top: 20px;
    margin-bottom: 20px;
  }

  .dropdown-content {
    position: fixed;
    width: 0;
    z-index: 1;
    height: 100%;
    background-color: rgb(249, 243, 243);
    overflow-x: hidden;
    left: 0;
    bottom: 0;
    transition: 0.5s;
    display: flex;
    flex-direction: column;
    text-align: center;

  }

  .w100 {
    width: 100%;
  }

  .cancel-button-box {
    display: flex;
    justify-content: space-between;
    background-color: rgb(249, 243, 243);
    padding: 10px;
    background: rgb(3, 53, 128);
    padding-bottom: 100px;
  }

  .cancel-button {
    border: none;
    background-color: rgb(3, 53, 128);
    font-size: 30px;
    color: rgb(223, 21, 21);
    font-weight: bold;
  }

  .logo {
    font-size: 30px;
    color: rgb(255, 255, 255);
    font-weight: bold;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .content {
    font-size: 30px;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .router-link {
    text-decoration: none;
    color: rgb(124, 124, 124);
    margin-left: 20px;
  }

  .nav-content {
    text-decoration: none;
    color: white;
    font-weight: bold;
    font-size:13px;
    padding:12px;
    border-radius: 15px;
  }

  .logout {
    border: none;
    padding: 10px;
    width: 100%;
    gap: 20px;
    display: flex;
    font-size: 20px;
    background-color: rgb(249, 243, 243);
  }


  .icon {
    padding: 10px;
    display: flex;
    gap: 5px;
    font-size: 20px;
    color: rgb(124, 124, 124);
  }

  .footer {
    margin-top: auto;
  }

  .active-route {
    border: 1px solid white;
    background-color: rgb(33, 73, 141)
  }

}
</style>
