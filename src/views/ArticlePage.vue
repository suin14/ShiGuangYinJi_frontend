<template>
  <div class="page-container">
    <!-- 页面内容 -->
    <div class="content-container">
      <!-- 左侧图片部分，如果有图片则显示图片 -->
      <div v-if="cardData.imageSrc" class="image-section">
        <img :src="cardData.imageSrc" alt="文章图片" />
      </div>

      <!-- 右侧的文章内容 -->
      <div class="text-section">
        <!-- 用户头像和用户名 -->
        <div class="header">
          <img :src="cardData.userAvatar" alt="用户头像" class="avatar" />
          <span class="user-name">{{ cardData.userName }}</span>
          <button @click="toggleFollow" class="follow-button">
            {{ isFollowing ? '已关注' : '关注' }}
          </button>
        </div>

        <!-- 文章标题 -->
        <h2 class="article-title">{{ cardData.title }}</h2>

        <!-- 文章内容 -->
        <div class="article-content">{{ cardData.content }}</div>

        <!-- 点赞和收藏按钮 -->
        <div class="action-buttons">
          <button @click="like" class="like-button">
            <img src="@/assets/icon/like.svg" alt="点赞" /> 点赞 {{ likes }}
          </button>
          <button @click="collect" class="collect-button">
            <img src="@/assets/icon/collect.svg" alt="收藏" /> 收藏 {{ collects }}
          </button>
        </div>

        <!-- 评论区 -->
        <div class="comments-section">
          <ul>
            <li v-for="(comment, index) in comments" :key="index" class="comment-item">
              <img :src="comment.userAvatar" alt="用户头像" class="comment-avatar" />
              <div class="comment-content">
                <span class="comment-user-name">{{ comment.userName }}</span>
                <p class="comment-text">{{ comment.content }}</p>
              </div>
            </li>
          </ul>
          <input type="text" v-model="newComment" placeholder="添加评论..." @keyup.enter="addComment" />
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import testImage from "@/assets/test.jpg";

const cardData = {
  imageSrc: testImage,
  userAvatar: testImage,
  userName: 'Jane Doe',
  title: '文章标题',
  content: '这是文章的内容部分...',
};

const likes = ref(0);
const collects = ref(0);
const newComment = ref('');
const isFollowing = ref(false);
const comments = ref([
  {
    userName: 'Alice',
    userAvatar: testImage,
    content: '这是一个很有帮助的文章！'
  },
  {
    userName: 'Bob',
    userAvatar: testImage,
    content: '感谢分享！非常有用。'
  }
]);

const toggleFollow = () => {
  isFollowing.value = !isFollowing.value;
};

const like = () => {
  likes.value++;
};

const collect = () => {
  collects.value++;
};

const addComment = () => {
  if (newComment.value.trim()) {
    comments.value.push({
      userName: 'User',
      userAvatar: testImage,
      content: newComment.value.trim()
    });
    newComment.value = '';
  }
};
</script>

<style scoped>
.page-container {
  padding: 20px;
  width: 180vh;
  margin: 0 auto;
  //font-family: 'Arial', sans-serif;
}

.content-container {
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: flex-start;
  justify-content: space-between;
}

.image-section img {
  max-width: 500px;
  width: 100%;
  height: auto;
  object-fit: cover;
}

.text-section {
  flex: 1;
  padding: 40px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  min-height: 60vh;
  height: auto;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-name {
  font-weight: bold;
}

.article-title {
  font-size: 1.5em;
  margin: 15px 0;
}

.article-content {
  font-size: 1em;
  margin: 15px 0;
  line-height: 1.6;
}

.action-buttons {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.like-button,
.collect-button {
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  border: none;
  font-size: 1em;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
  color: #555;
  transition: background-color 0.2s;
}

.like-button img,
.collect-button img {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.like-button:hover,
.collect-button:hover {
  background-color: #f1f1f1;
}

.like-button:hover img,
.collect-button:hover img {
  transform: scale(1.1);
  transition: transform 0.2s ease;
}

.comments-section {
  margin-top: 20px;
  max-height: 300px;
  overflow-y: auto;
}

.comments-section ul {
  list-style: none;
  padding: 0;
}

.comment-item {
  display: flex;
  margin-bottom: 10px;
  align-items: flex-start;
}

.comment-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}

.comment-content {
  max-width: 500px;
}

.comment-user-name {

}

.comment-text {
  margin-top: 5px;
}

.comments-section input {
  width: 95%;
  padding: 8px;
  margin-top: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: transparent;
  color: #242424;
  outline: none;
}

.follow-button {
  margin-left: 15px;
  background-color: #000000;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.7em;
  transition: background-color 0.3s;
  outline: none;
}

.follow-button:hover {
  background-color: #252525;
}

.comments-section {
  max-height: 200px; /* 设置固定高度 */
  overflow-y: auto; /* 内容超出时产生垂直滚动条 */
  padding-right: 10px; /* 给滚动条腾出一点空间 */
}

.comments-section ul {
  list-style: none;
  padding: 0;
  margin: 10px 0;
  word-wrap: break-word; /* 允许长单词或URL在单词中断点换行 */
  overflow-wrap: break-word;
}

/* 美化滚动条 */
.comments-section::-webkit-scrollbar {
  width: 10px;
}

.comments-section::-webkit-scrollbar-thumb {
  background: white;
  border-radius: 10px;
}

.comments-section::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

</style>
