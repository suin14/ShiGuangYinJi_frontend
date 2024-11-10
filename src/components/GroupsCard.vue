<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  image: String,
  name: String,
  members: Number,
});
</script>

<template>
  <div class="showBoard">
    <div class="leftBoard">
      <img :src="image" alt="" class="leftBoardImg"/>
    </div>
    <div class="rightBoard">
      <div class="name">{{ name }}</div>
      <div class="member"><span>人数：{{ members }}</span></div>
    </div>
  </div>
</template>

<style scoped>
.showBoard {
  position: relative;
  width: 40vh;
  height: 12vh;
  margin: 5px 0 15px 5px;
  border-radius: 10px;
  box-shadow: 1px 1px 8px rgb(128, 128, 128);
  background-color: white;
}

.leftBoard {
  position: absolute;
  top: 10px;
  left: 10px;
  display: inline-block;
  width: 8vh;
  border-radius: 10px;
  background-color: lightgray;
}

.leftBoardImg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.rightBoard {
  position: absolute;
  top: 15px;
  right: 10px;
  display: inline-block;
  width: calc(100% - 13vh);
}

.name {
  font-size: 1.1em;
  white-space: nowrap;
  margin-bottom: 5px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}

.member {
  color: rgb(128, 128, 128);
  text-align: left;
  font-size: 0.8em;
}
</style>
