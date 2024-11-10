<script setup>
import { ref } from 'vue';
import avatarImage from "@/assets/icon/avatar.jpg";

const currentView = ref('评论');
const messages = ref([
  {
    userName: '小明',
    time: '2024-11-10 14:30',
    content: '这篇文章真好，感谢分享！',
    articleTitle: 'Vue3 入门教程',
    message: '收藏了你的文章',
    avatarUrl: avatarImage
  },
  {
    userName: '小红',
    time: '2024-11-10 15:00',
    content: '很有帮助，学习了！',
    articleTitle: 'Vue3 入门教程',
    message: '赞了你的文章',
    avatarUrl: avatarImage
  }
]);

const switchView = (view) => {
  currentView.value = view;
};

const replyToComment = (comment) => {
  console.log(`回复评论: ${comment.userName}`);
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
        <div v-if="currentView === '评论'" v-for="(message, index) in messages" :key="index" class="comment-item">
          <div class="comment-header">
            <div class="left-side">
              <img :src="message.avatarUrl" alt="头像" class="avatar" />
              <strong>{{ message.userName }}</strong>
            </div>
            <span class="comment-time">{{ message.time }}</span>
          </div>
          <div class="comment-body">
            <p>{{ message.content }}</p>
            <span class="article-title">{{ message.articleTitle }}</span>
          </div>
          <div class="reply-btn" @click="replyToComment(message)">
            <img src="@/assets/icon/reply.svg" alt="回复" />
          </div>
        </div>

        <div v-if="currentView === '赞收藏'" v-for="(message, index) in messages" :key="index" class="comment-item">
          <div class="comment-header">
            <div class="left-side">
              <img :src="message.avatarUrl" alt="头像" class="avatar" />
              <strong>{{ message.userName }}</strong>
            </div>
            <span class="comment-time">{{ message.time }}</span>
          </div>
          <div class="comment-body">
            <p>{{ message.message }}</p>
            <span class="article-title">{{ message.articleTitle }}</span>
          </div>
        </div>

        <div v-if="currentView === '关注'" v-for="(message, index) in messages" :key="index" class="comment-item">
          <div class="comment-header">
            <div class="left-side">
              <img :src="message.avatarUrl" alt="头像" class="avatar" />
              <strong>{{ message.userName }}</strong>
            </div>
            <span class="comment-time">{{ message.time }}</span>
          </div>
          <div class="comment-body">
            <p>关注了你！</p>
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
  flex: 3;
  background-color: #f6f6f6;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  height: 75vh;
  margin-top: 20px;
  margin-right: 20px;
  text-align: left;
  overflow-y: auto;
}

.top-navi {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  font-size: 1.2em;
}

.top-navi span {
  margin-right: 20px;
  cursor: pointer;
  transition: color 0.3s ease, font-weight 0.3s ease;
}

.top-navi span:hover {
  color: #213547;
}

.active {
  color: #213547;
  font-family: 'ShangGuB', sans-serif;
}

.left-box-content {
  font-size: 1.1em;
  color: #555;
  line-height: 1.6;
}

.comment-item {
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9em;
}

.left-side {
  display: flex;
  align-items: center;
}

.comment-header strong {
  color: #213547;
}

.comment-time {
  font-size: 0.7em;
  color: #777;
}

.comment-body {
  margin-top: 10px;
  margin-left: 10px;
  font-size: 0.8em;
  color: #333;
}

.article-title {
  color: rgb(128, 128, 128);
  cursor: pointer;
}

.reply-btn {
  padding: 8px 15px;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: 0.3s ease;
  outline: none;
  width: 24px;
  height: 24px;
  position: absolute;
  right: 6%;
  margin-top: -2.5%;
}

.reply-btn img {
  width: 24px;
  height: 24px;
}

.reply-btn:hover {
  transform: scale(1.1);
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  margin-left: 10px;
}
</style>
