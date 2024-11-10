<script setup>
import { ref, computed } from 'vue';
import vueImage from "@/assets/test1.png";
import avatarImage from "@/assets/icon/avatar.jpg";
import testImage from "@/assets/icon/avatar.jpg";
import addIcon from '@/assets/icon/add.svg';

const currentView = ref('审核');
const switchView = (view) => {
  currentView.value = view;
};

// 添加话题
const addTopic = () => {
  const newTopic = prompt("请输入新话题名称：");
  if (newTopic) {
    topics.value.push(newTopic);
  }
};

// 删除话题
const deleteTopic = (index) => {
  topics.value.splice(index, 1);
};

const cards = ref([
  { imageSrc: vueImage, title: '欢迎来到主页', userAvatar: avatarImage, userName: 'Momo', content: '这是主页的简介' },
  { imageSrc: testImage, title: '开发者社区', userAvatar: avatarImage, userName: '张三', content: '加入我们的开发者社区' },
  { imageSrc: vueImage, title: 'Vue 3 教程', userAvatar: avatarImage, userName: '李四', content: '学习 Vue 3 的基础知识' },
  { imageSrc: testImage, title: 'JavaScript 学习', userAvatar: avatarImage, userName: '王五', content: '深入了解 JavaScript 语言' },
  { imageSrc: vueImage, title: '欢迎来到主页', userAvatar: avatarImage, userName: 'Momo', content: '这里是一个欢迎页面' },
  { imageSrc: testImage, title: '开发者社区', userAvatar: avatarImage, userName: '张三', content: '加入社区获取关于技术文章' },
  { imageSrc: vueImage, title: 'Vue 3 教程', userAvatar: avatarImage, userName: '李四', content: '本教程适合初学者' },
  { imageSrc: testImage, title: 'JavaScript 学习', userAvatar: avatarImage, userName: '王五', content: '提供详细的 JavaScript 教程' }
]);

const topics = ref([
  '科技',
  '健康',
  '旅游',
  '教育',
  '娱乐',
  '健康',
  '旅游',
  '教育',
  '娱乐'
]);

const currentPage = ref(1);
const pageSize = ref(3);
const totalPages = computed(() => Math.ceil(cards.value.length / pageSize.value));

const paginatedCards = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return cards.value.slice(start, end);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};
</script>

<template>
  <div class="container">
    <div class="left-box">
      <div class="top-navi">
        <span @click="switchView('审核')" :class="{ active: currentView === '审核' }">审核文章</span>
        <span @click="switchView('话题')" :class="{ active: currentView === '话题' }">管理话题</span>
      </div>

      <div class="navi-content">
        <div v-for="(card, index) in paginatedCards" :key="index" class="content-card" v-if="currentView === '审核'">
          <img :src="card.imageSrc" alt="Card Image" class="card-image" />

          <div class="card-content">
            <span>{{ card.content }}</span>
          </div>

          <div class="card-details">
            <h3 class="card-title">{{ card.title }}</h3>

            <div class="card-header">
              <img :src="card.userAvatar" alt="User Avatar" class="avatar-image" />
              <span class="user-name">{{ card.userName }}</span>
            </div>
          </div>
        </div>

        <div v-if="currentView === '话题'">
          <div class="topic-container">
            <!-- 话题列表 -->
            <ul class="topic-list">
              <li v-for="(topic, index) in topics" :key="index" class="topic-item">
                <!-- 左侧话题名称 -->
                <span class="topic-name">{{ topic }}</span>

                <!-- 右侧删除按钮 -->
                <button @click="deleteTopic(index)" class="delete-button">删除</button>
              </li>
            </ul>

            <button @click="addTopic" class="add-button">
              <img :src="addIcon" alt="Add Icon" class="add-icon" />
            </button>
          </div>
        </div>
      </div>

      <!-- Pagination Controls -->
      <div class="pagination-controls" v-if="currentView === '审核'">
        <button @click="prevPage" :disabled="currentPage === 1">上一页</button>
        <span>第 {{ currentPage }} 页，共 {{ totalPages }} 页</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
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
  padding: 3vh;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgb(128, 128, 128);
  height: 75vh;
  margin-top: 5vh;
  margin-right: 5vh;
  display: flex;
  flex-direction: column;
}

.top-navi {
  margin-bottom: 3vh;
  cursor: pointer;
  user-select: none;
  display: flex;
  gap: 10px;
}

.top-navi span {
  font-size: 1.3em;
  padding: 5px 15px;
  border-radius: 20px;
  transition: background-color 0.3s ease;
}

.active {
  font-weight: bold;
  color: #213547;
  font-family: 'ShangGuB', sans-serif;
  background-color: #e3e1e1;
}

.navi-content {
  flex-grow: 1;
  margin: 10px;
  overflow-y: auto;
}

.content-card {
  display: flex;
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
  margin: 10px 20px 20px 10px;
  box-shadow: 1px 1px 8px rgb(128, 128, 128);
  justify-content: space-between;
  align-items: center;
}

.card-image {
  width: 120px;
  height: 120px;
  margin-right: 25px;
}

.card-content {
  flex-grow: 1;
  padding: 0 10px;
  text-align: left;
  width: 60vh;
  font-family: 黑体 , serif;
}

.card-details {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 20px;
}

.card-header {
  display: flex;
  align-items: center;
}

.avatar-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-name {
  font-size: 14px;
  color: #555;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-top: 8px;
  font-family: 'ShangGuB', sans-serif;
}

/* 美化滚动条 */
.navi-content::-webkit-scrollbar {
  width: 10px;
}

.navi-content::-webkit-scrollbar-thumb {
  background: white;
  border-radius: 10px;
}

.navi-content::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

/* 翻页按钮 */
.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  outline: none;
}

.pagination-controls button {
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
  background-color: lightgray;
  color: #242424;
  outline: none;
}

.pagination-controls button:hover {
  background-color: #b7b7b7;
  outline: none;
}

.pagination-controls span {
  margin: 0 10px;
}

/* 话题 */
.topic-container {
  width: 90%;
  margin: 0 auto;
  padding: 10px;
  border-radius: 8px;
}

.add-button {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  background-color: transparent;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  text-align: center;
  transition: background-color 0.3s;
}

.add-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

.add-button:hover {
  background-color: lightgray;
  outline: none;
}
.add-button:focus {
  outline: none;
}

/* 话题列表样式 */
.topic-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.topic-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

/* 话题名称样式 */
.topic-name {
  font-size: 16px;
  color: #333;
}

/* 删除按钮样式 */
.delete-button {
  background-color: #ff4d4d;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.delete-button:hover {
  background-color: #ff1a1a;
  outline: none;
}
</style>
