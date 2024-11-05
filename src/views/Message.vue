<script setup>
import { ref } from 'vue';
import {useRouter} from "vue-router";
const currentView = ref('评论');

const switchView = (view) => {
  currentView.value = view;
};
</script>

<template>

  <div class="container">
    <div class="left-box">
      <div class="top-navi">
        <span @click="switchView('评论')" :class="{ active: currentView === '评论' }">评论和@</span>
        <span> | </span>
        <span @click="switchView('赞收藏')" :class="{ active: currentView === '赞收藏' }">赞和收藏</span>
        <span> | </span>
        <span @click="switchView('关注')" :class="{ active: currentView === '关注' }">新增关注</span>
      </div>
      <div class="left-box-content">
        <div v-if="currentView === '评论'">其他用户对我文章的评论</div>
        <div v-if="currentView === '赞收藏'">其他用户点赞收藏我的文章</div>
        <div v-if="currentView === '关注'">其他用户关注了我</div>
      </div>
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
  padding: 5vh 3vh 3vh 5vh;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgb(128, 128, 128);
  height: 75vh;
  margin-top: 5vh;
  margin-right: 5vh;
  text-align: left;
}

.top-navi {
  margin-bottom: 4vh;
  cursor: pointer;
  user-select: none;
}

.top-navi span{
  font-size: 1.3em;
}

.active {
  font-weight: bold;
  color: #213547;
  font-family: 'ShangGuB', sans-serif;
}

</style>
