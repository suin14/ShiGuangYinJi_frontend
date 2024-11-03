<script setup>
import { ref } from 'vue';
import Editor from "@/components/Editor.vue";
import ArticleList from "@/components/ArticleList.vue";

// 状态来跟踪当前选中的导航项
const currentView = ref('文章');

// 定义切换视图的函数
const switchView = (view) => {
  currentView.value = view;
};
</script>

<template>
  <div class="container">
    <div class="left-box">
      <div class="left-box-navi">
        <span @click="switchView('文章')" :class="{ active: currentView === '文章' }">文章</span> |
        <span @click="switchView('预览')" :class="{ active: currentView === '预览' }">预览</span> |
        <span @click="switchView('模板')" :class="{ active: currentView === '模板' }">模板</span>
      </div>
      <div class="left-box-content">
        <ArticleList v-if="currentView === '文章'" />
        <div v-if="currentView === '预览'">预览内容</div>
        <div v-if="currentView === '模板'">模板内容</div>
      </div>
    </div>
    <div class="main-box">
      <Editor />
    </div>
    <div class="right-box">
      智能体接口
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  width: 188vh;
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
  font-weight: bold; /* 激活项的样式 */
  color: #213547;
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
  height: 75vh;
  margin-top: 5vh;
}

.left-box-content {
}
</style>
