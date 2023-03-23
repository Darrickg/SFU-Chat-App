import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login'

const app=createApp(App)



let googleClientID='113462210670-5i19fcfbjs0hiuknf7qqjcq2kn8voart.apps.googleusercontent.com';
//let googleClientSecret='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';
/*app.use(GAuth,{
    clientId:googleClientID,
    scope:'email',
    prompt:'consent',//select_account
});*/
app.use(vue3GoogleLogin,{
    clientId:googleClientID
})

app.use(router).mount('#app')