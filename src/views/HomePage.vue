<script setup>
import { ref } from 'vue';

const searchInput = ref('');

const currentView = ref('推荐');

const switchView = (view) => {
  currentView.value = view;
};

function clearInput() {
  searchInput.value = '';
}
</script>

<template>
  <div class="main-page">
    <div class="input-box">
      <input
          type="text"
          class="search-input"
          placeholder="搜索..."
          v-model="searchInput"
      />
      <div class="input-button">
        <div
            class="close-icon"
            v-if="searchInput"
            @click="clearInput"
        >
          <img src="@/assets/icon/close.svg" alt="关闭" />
        </div>
        <div class="search-icon">
          <img src="@/assets/icon/search.svg" alt="搜索" />
        </div>
      </div>
    </div>

    <div class="content">
      <div class="top-navi">
        <span @click="switchView('推荐')" :class="{ active: currentView === '推荐' }">推荐</span>
        <span> | </span>
        <span @click="switchView('关注')" :class="{ active: currentView === '关注' }">关注</span>
      </div>
      <div class="navi-content">
        <div v-if="currentView === '推荐'">
          // 用瀑布流插入卡片

        </div>
        <div v-if="currentView === '关注'">关注用户动态</div>
      </div>
    </div>

  </div>

</template>

<style scoped>
.content {
  margin-top: 4vh;
}

.top-navi {
  margin-bottom: 3vh;
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

.input-box {
  margin-top: 4vh;
  width: 65vh;
  height: 40px;
  position: relative;
  left: 50%;
  transform: translate(-50%);
  display: flex;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 999px;
  overflow: hidden;
}

.search-input {
  padding: 0 60px 0 20px;
  width: 100%;
  height: 100%;
  font-size: 16px;
  color: #333;
  caret-color: rgba(1, 50, 12, 0.74);
  background: rgba(0, 0, 0, 0.03);
  border: none;
  outline: none;
  border-radius: 999px;
  transition: background-color 0.3s ease;
}

.search-input::placeholder {
  color: rgba(51, 51, 51, 0.5);
}

.search-input:focus {
  background-color: rgba(0, 0, 0, 0.05);
}

.input-button {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 20px;

  .close-icon img,
  .search-icon img {
    width: 24px;
    height: 24px;
    cursor: pointer;
    transition: transform 0.3s ease;
    padding-left: 10px;
    padding-top: 5px;

    &:hover {
      transform: scale(1.1);
    }
  }
}

.navi-content {
width: 150vh;
}
</style>
