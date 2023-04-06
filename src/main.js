import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login'


import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import {aliases, mdi} from "vuetify/iconsets/mdi";
import VueCookies from 'vue-cookies'

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        }
    },
})

const app=createApp(App)

let googleClientID='113462210670-5i19fcfbjs0hiuknf7qqjcq2kn8voart.apps.googleusercontent.com';
app.use(vue3GoogleLogin,{
    clientId:googleClientID
})
app.use(vuetify)
app.use(VueCookies);
app.use(router).mount('#app')
