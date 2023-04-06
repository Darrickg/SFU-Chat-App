<script>
import LoginBox from '@/components/LoginPage/LoginBox.vue'

export default {
    name: "LoginView",
    components: {
        LoginBox,
    },

    methods: {
        goToHome() {
            this.$router.push({ name: 'chooseCourse' })
        }
    }
}
</script>
<script setup>
import {decodeCredential} from 'vue3-google-login'
const googleCallback=(response)=>{
  const userData = decodeCredential(response.credential)
  const userEmail=userData.email;
  const userName=userData.given_name;
}
</script>


<template>
    <div class="flex-container">
        <div class="login">
            <LoginBox />
            <br>
            <button @click="goToHome()">Sign in as guest</button>
        </div>
        <br />
        <br />

        <div>
            <!--a href="https://cas.sfu.ca/cas/login?service=http%3A%2F%2F34.130.237.234%2F"><button>SFU Login</button></a>-->
            <!-- <a href="https://cas.sfu.ca/cas/logout?service=http%3A%2F%2F34.130.237.234%2F"><button>SFU Logout</button></a> -->
            <!--GoogleLogin :callback="googleCallback"/-->
        </div>
    </div>
</template>

<style scoped>
.login {
    border: 2px solid black;
    display: inline-block;
    padding: 30px;
}

button{
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;   
}

button:hover {
    background-color: #3e8e41;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
}

.flex-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
    flex-direction: column;
}
</style>