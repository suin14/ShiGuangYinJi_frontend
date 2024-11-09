<script setup>
import { ref } from 'vue';
import Editor from "@/components/Editor.vue";

// 状态来跟踪当前选中的导航项
const currentView = ref('预览');
const searchInput = ref('');
// 定义切换视图的函数
const switchView = (view) => {
  currentView.value = view;
};

function clearInput() {
  searchInput.value = '';
}
</script>

<template>
  <div class="container">
    <div class="left-box">
      <div class="left-box-navi">
        <span @click="switchView('预览')" :class="{ active: currentView === '预览' }">预览</span> |
        <span @click="switchView('版式')" :class="{ active: currentView === '版式' }">版式</span>
      </div>
      <div class="left-box-content">
        <div v-if="currentView === '预览'">预览内容</div>
        <div v-if="currentView === '版式'">模板内容</div>
      </div>
    </div>
    <div class="main-box">
      <Editor />
    </div>
    <div class="right-box">
      智能体接口

      <div class="input-box">
        <input
            type="text"
            class="search-input"
            placeholder=请输入内容...
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
            <img src="@/assets/icon/send.svg" alt="发送" />
          </div>
        </div>
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
  flex: 1;
  background-color: #f6f6f6;
  padding: 3vh;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgb(128, 128, 128);
  height: 75vh;
  margin-top: 5vh;
}

.left-box-navi {
  margin-bottom: 2vh;
  cursor: pointer;
}

.active {
  font-weight: bold;
  color: #213547;
  font-family: 'ShangGuB', sans-serif;
}

.main-box {
  flex: 3;
  margin-left: 5vh;
  margin-right: 5vh;
}

.right-box {
  flex: 1;
  background-color: #f6f6f6;
  padding: 3vh;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgb(128, 128, 128);
  height: 55vh;
  margin-top: 5vh;
}

.input-box {
  position: absolute;
  top: 56vh;
  right: -10vh;
  margin-top: 4vh;
  width: 35vh;
  height: 40px;
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
</style>
