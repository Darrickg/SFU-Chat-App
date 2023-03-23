<!--
    For submitting new message to discussion
-->
<template>
    <form>
      <textarea id="newMessage" class="border-solid border-2 border-gray-300 resize-none mx-1 mt-2"></textarea>
      <input type="submit" value="send" class="bg-gray-500 text-white hover:text-gray-600 hover:bg-white p-1 rounded">
    </form>
</template>

<script>
export default {
  name: 'MessageForm',
  props: {

  }
}
</script>

<style scoped>

</style>
