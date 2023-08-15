import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import i18n from './translator/i18n'
import "/node_modules/flag-icons/css/flag-icons.min.css";
import VueAwesomePaginate from "vue-awesome-paginate";
import './Style/NavigationStyle.css'
import './Style/CommonStyle.css'


const app = createApp(App).use(router).use(VueAwesomePaginate)

i18n(app).mount('#app')

