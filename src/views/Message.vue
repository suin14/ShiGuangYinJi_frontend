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
    avatarUrl: avatarImage,
    showReplyInput: false, // 控制是否显示回复输入框
    replyText: ''
  },
  {
    userName: '小红',
    time: '2024-11-10 15:00',
    content: '很有帮助，学习了！',
    articleTitle: 'Vue3 入门教程',
    message: '赞了你的文章',
    avatarUrl: avatarImage,
    showReplyInput: false,
    replyText: ''
  }
]);

const switchView = (view) => {
  currentView.value = view;

  // 关闭所有回复输入框
  messages.value.forEach((message) => {
    message.showReplyInput = false;
  });
};

const toggleReplyInput = (index) => {
  messages.value[index].showReplyInput = !messages.value[index].showReplyInput;
};

const submitReply = (index) => {
  console.log(`回复 ${messages.value[index].userName}: ${messages.value[index].replyText}`);
  messages.value[index].replyText = ''; // 发送后清空输入框
  messages.value[index].showReplyInput = false; // 隐藏输入框
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
          <div class="reply-btn" @click="toggleReplyInput(index)">
            <img src="@/assets/icon/reply.svg" alt="回复" />
          </div>

          <!-- 回复输入框 -->
          <div v-if="message.showReplyInput" class="reply-input">
            <input
                v-model="message.replyText"
                type="text"
                placeholder="输入你的回复..."
            />
            <div class="send-btn">
              <img src="@/assets/icon/send.svg" alt="发送" @click="submitReply(index)"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 容器 */
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

/* 回复输入框 */
.reply-input {
  margin-top: 10px;
  display: flex;
  gap: 10px;
  align-items: center;
}

.reply-input input {
  width: 95%;
  padding: 8px;
  margin-top: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: transparent;
  color: #242424;
  outline: none;
}

.send-btn img {
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: transform 0.3s ease;
  padding-left: 5px;
  padding-top: 12px;
}

.send-btn:hover {
  transform: scale(1.1);
}
</style>
