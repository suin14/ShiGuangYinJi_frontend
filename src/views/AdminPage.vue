<script setup>
import { ref } from 'vue';

</script>

<template>

  <div class="container">
    <div class="left-box">
      待审核的文章
    </div>


  </div>
</template>

<style scoped>
.container {
  display: flex;
  width: 188vh;
  user-select: none;
}

.left-box {
  flex: 3;
  background-color: #f6f6f6;
  padding: 3vh;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgb(128, 128, 128);
  height: 75vh;
  margin-top: 5vh;
  margin-right: 5vh;
}

</style>
