<template>
  <section class="flex flex-wrap items-center bg-sfu-dark-red w-full">
    <img alt="SFU logo" src="@/assets/SFU_block.png" class="h-14 w-auto">
    <button @click="isHidden=!isHidden" class=" text-center absolute right-2 text-white hover:bg-white">
      <span class="hover:text-sfu-dark-red">
        {{ existCookie ? `Welcome, ${userName}` : `Account`}}
      </span>
    </button>

    <nav id="accountNav" v-if="!isHidden" class="container flex flex-wrap bg-sfu-dark-red">

      <router-link to="/choose" class="text-white hover:bg-white p-1">
        <span class="hover:text-sfu-dark-red">
          Home
        </span>
      </router-link>

      <router-link to="/settings" class="text-white hover:text-sfu-dark-red hover:bg-white p-1">
        <span class="hover:text-sfu-dark-red">
          Settings
        </span>
      </router-link>

      <router-link to="/" class="text-white hover:text-sfu-dark-red hover:bg-white p-1">
        <span class="hover:text-sfu-dark-red">
          Log Out
        </span>
      </router-link>

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
  computed:{
    userName(){
      return this.$cookies.get("username");
    },
    existCookie(){
      return this.$cookies.isKey("username");
    },
  },
  props: {

  },
};
</script>

<style scoped>

</style>
