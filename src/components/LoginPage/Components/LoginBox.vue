<script>
export default {
    name: "LoginBox",
    components: {
        
    },
}
</script>

<template>
    <div>
        <h1>Login with Credentials</h1>
        <br />
        <form @submit.prevent="login">
            <div>
                <label for="username">Username</label><br />
                <input class="custom-input" type="text" id="username" v-model="username" />
            </div>
            <br />
            <div>
                <label for="password">Password</label><br />
                <input class="custom-input" type="password" id="password" v-model="password" />
            </div>
            <br />
            <button class="submit-button" type="submit">Login</button>
        </form>
    </div>
</template>

<style scoped>
.custom-input {
    appearance: none;
    background-color: transparent;
    border: 1px solid black;
    border-radius: 3px;
    padding: 0.5rem 1rem;
    font-size: 75%;
    font-weight: 500;
    font-style: bold;
    width: 350px;
    height: 33px;
    color: black;
    margin-left: 15px;
}

.submit-button {
    display: inline-block;
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    transition: all 0.3s ease-in-out;
}

.submit-button:hover {
    background-color: #3e8e41;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
}

label {
    text-align: left;
    font-style: bold;
}
</style>