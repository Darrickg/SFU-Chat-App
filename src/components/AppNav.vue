<!--
    On all pages (at the top?)
    List all page sections:
        Home
        Settings
        Log Out
        ...whatever else we come up with
-->
<template>
    <nav class="container flex flex-wrap bg-sfu-dark-red">
      <img alt="SFU logo" src="@/assets/SFU_block.png" class="h-14 w-auto">
      <a href="" class="text-white hover:text-sfu-dark-red hover:bg-white">Home</a>
      <a href="" class="text-white hover:text-sfu-dark-red hover:bg-white">Settings</a>
      <a href="" class="text-white hover:text-sfu-dark-red hover:bg-white">Log Out</a>
    </nav>
</template>

<script>
export default {
  name: 'AppNav',
  props: {

  }
}
</script>

<style scoped>

</style>
