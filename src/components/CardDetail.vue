<template>
  <div class="overlay" v-if="isVisible" @click.self="close">
    <div class="modal">
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
                <span class="comment-user-name">{{ comment.userName }}</span>
                <div class="comment-content">

                  <p class="comment-text">{{ comment.content }}</p>
                </div>
              </li>
            </ul>
            <input type="text" v-model="newComment" placeholder="添加评论..." @keyup.enter="addComment" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import vueImage from '@/assets/vue.svg';

const props = defineProps({
  cardData: Object,
  isVisible: Boolean,
});

const emits = defineEmits(['close']);

const likes = ref(0);
const collects = ref(0);
const newComment = ref('');
const isFollowing = ref(false);
const comments = ref([
  {
    userName: 'Alice',
    userAvatar: vueImage,
    content: '这是一个很有帮助的文章！'
  },
  {
    userName: 'Bob',
    userAvatar: vueImage,
    content: '感谢分享！非常有用。'
  }
  // 其他评论数据
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
    comments.value.push(newComment.value.trim());
    newComment.value = '';
  }
};

const close = () => {
  emits('close');
};

watch(() => props.isVisible, (newVal) => {
  if (newVal) {
    likes.value = 0;
    collects.value = 0;
  }
});
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  user-select: none;
}

.modal {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  width: 70%;
  max-width: 800px;
  display: flex;
  max-height: 90vh;
  min-height: 70vh;
}

.content-container {
  display: flex;
  width: 100%;
  text-align: left;
}

.image-section img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.text-section {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 200px;
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
  font-size: 1.1em;
  margin: 15px 0;
  font-family: 'ShangGuB', sans-serif;
}

.article-content {
  margin: 20px 0;
  flex: 1;
  font-size: 0.9em;
}

.action-buttons {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.like-button,
.collect-button {
  display: flex;
  align-items: center;
  background-color: #fff;
  border: none;
  font-size: 0.8em;
  cursor: pointer;
  color: #242424;
  outline: none;
}

.like-button img,
.collect-button img {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.like-button:hover img,
.collect-button:hover img {
  transform: scale(1.1);
  transition: transform 0.2s ease;
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

.comments-section ul li {
  word-wrap: break-word;
  overflow-wrap: break-word;
  font-size: 0.8em;
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
</style>
