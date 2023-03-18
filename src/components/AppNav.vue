<!--
    On all pages (at the top?)
    List all page sections:
        Home
        Settings
        Log Out
        ...whatever else we come up with
-->
<template>
  <section class="container flex flex-wrap bg-sfu-dark-red">
    <img alt="SFU logo" src="@/assets/SFU_block.png" class="h-14 w-auto">
    <button @click="isHidden=!isHidden" class="text-white hover:text-sfu-dark-red hover:bg-white">Account</button>
    <nav id="accountNav" v-if="!isHidden" class="container flex flex-wrap bg-sfu-dark-red">
      <router-link to="/" class="text-white hover:text-sfu-dark-red hover:bg-white">Home</router-link>
      <router-link to="/settings" class="text-white hover:text-sfu-dark-red hover:bg-white">Settings</router-link>
      <router-link to="/login" class="text-white hover:text-sfu-dark-red hover:bg-white">Log Out</router-link>
    </nav>
  </section>
</template>

<script>
export default {
  name: 'AppNav',
  data(){
    let isHidden=new Boolean(true);
    return{isHidden};
  },
  props: {

  },
}
</script>

<style scoped>

</style>
