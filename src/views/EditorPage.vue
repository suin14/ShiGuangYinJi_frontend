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
  margin-right: 10vh;
}

</style>
