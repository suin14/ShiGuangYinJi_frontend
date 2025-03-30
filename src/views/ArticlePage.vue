<template>
  <div class="page-container">
    <!-- 页面内容 -->
    <div class="content-container">
      <!-- 左侧图片部分，如果有图片则显示图片 -->
<!--      <div v-if="articleData.imageSrc" class="image-section">-->
<!--        <img :src="articleData.imageSrc" alt="文章图片" />-->
<!--      </div>-->

      <!-- 右侧的文章内容 -->
      <div class="text-section" >
        <!-- 用户头像和用户名 -->
        <div class="header">
          <img :src="authorData.avatar_url" alt="作者头像" class="avatar"/>
          <span class="user-name">{{ authorData.nickname }}</span>
<!--          <button @click="toggleFollow" class="follow-button">-->
<!--            {{ isFollowing ? '已关注' : '关注' }}-->
<!--          </button>-->
        </div>

        <!-- 文章标题 -->
        <h2 class="article-title">{{ title }}</h2>

        <!-- 文章内容 -->
        <div class="article-content" v-html="content"></div>

        <!-- 点赞和收藏按钮 -->
        <div class="action-buttons">
          <button @click="like" class="like-button" v-if="!isLiked">
            <img src="@/assets/icon/like.svg" alt="点赞" /> 点赞 {{ likes }}
          </button>
          <button @click="like" class="like-button" v-if="isLiked" style="background-color: #b8dec1">
            <img src="@/assets/icon/like.svg" alt="点赞" /> 点赞 {{ likes }}
          </button>
          <button @click="collect" class="collect-button" v-if="!isFavorited">
            <img src="@/assets/icon/collect.svg" alt="收藏" /> 收藏
          </button>
          <button @click="collect" class="collect-button" v-if="isFavorited" style="background-color: #ffdead">
            <img src="@/assets/icon/collect.svg" alt="收藏" /> 收藏
          </button>
        </div>

        <!-- 评论区 -->
        <div class="comments-section">
          <ul>
            <li v-for="(comment, index) in comments" :key="index" class="comment-item">
              <div class="comment-content">
                <div class="comment-header">
                  <img :src="comment.avatar_url" alt="用户头像" class="comment-avatar" />
                  <span class="comment-user-name">{{ comment.nickname }}</span>
                </div>
                <p class="comment-text">{{ comment.content }}</p>
              </div>
            </li>
          </ul>

        </div>
        <input type="text" v-model="newComment" placeholder="添加评论..." @keyup.enter="addComment" />
      </div>
    </div>
  </div>
</template>


<script setup>
import {onMounted, ref} from 'vue';
import testImage from "@/assets/test.jpg";
import {useRoute} from "vue-router";
import {
  addFavorite,
  checkUserFavorite, getArticleComments,
  getDocById,
  getDocLikeCount,
  GetUserById,
  getUserLikeStatus,
  likeDoc, postArticleComment
} from "@/api/api.js";
import router from "@/router/index.js";

const route = useRoute();
const articleData = ref({
  imageSrc: testImage,
  userAvatar: testImage,  // 提供默认头像，避免 undefined
  userName: '加载中...',
});
const title = ref('');
const content = ref('');

const likes = ref(0);
const newComment = ref('');
const isFollowing = ref(false);
const isLiked = ref(false);
const isFavorited = ref(false);
const comments = ref([]);

const toggleFollow = () => {
  isFollowing.value = !isFollowing.value;
};

const like = async () => {
    try {
      const docId = route.query.id;
      await likeDoc(docId);
      if (!isLiked.value) {
        likes.value++;
        isLiked.value = true;
      } else {
        likes.value--;
        isLiked.value = false
      }
    } catch (error) {
      console.error('点赞失败:', error);
    }
};
const collect = async () => {
  try {
    const docId = route.query.id;
    await addFavorite(docId);
    isFavorited.value = !isFavorited.value;
  } catch (error) {
    console.error('收藏失败:', error);
  }
};


const authorData = ref({});

onMounted(async () => {
  try {
    const docId = route.query.id;
    const res = await getDocById(docId);

    if (res && res.data) {
      title.value = res.data.title || '无标题';
      content.value = res.data.content || '暂无内容';
    }

    const authorRes = await GetUserById(res.data.owner_id);
    if (authorRes) {
      authorData.value = authorRes;
    }
    // console.log(authorData.value)

    const likesRes = await getDocLikeCount(docId)
    likes.value = likesRes.like_count
    isLiked.value = await getUserLikeStatus(docId)

    const checkUserFavoriteRes = await checkUserFavorite(docId)
    isFavorited.value = checkUserFavoriteRes.is_favorited

    await loadComments(docId)
    console.log(comments)
  } catch (error) {
    console.error("加载文章失败", error);
  }

});

// 跳转作者主页
const gotoUser = (userId) => {
  console.log(userId)
  router.push({
    name: '个人主页',
    query: {
      id: userId
    }
  });
}

async function loadComments(docId) {
  try {
    const commentsRes = await getArticleComments(docId);
    comments.value = commentsRes.comments;
    await addUserInfoToComments();
    console.log(comments.value);
  } catch (error) {
    console.error("加载评论失败");
  }
}

const addUserInfoToComments = async () => {
  for (const comment of comments.value) {
    try {
      const userInfo = await GetUserById(comment.user_id);
      comment.nickname = userInfo.nickname;
      comment.avatar_url = userInfo.avatar_url;
    } catch (error) {
      console.error(`获取用户 ${comment.user_id} 信息失败`, error);
    }
  }
};

async function submitComment(docId, content) {
    const newComment = await postArticleComment(docId, content);
    console.log("成功提交评论:", newComment);
}


const addComment = async () => {
  if (newComment.value.trim()) {
    const docId = route.query.id;
    const content = newComment.value.trim();

    const response = await submitComment(docId, content);

    const commentsRes = await getArticleComments(docId);
    comments.value = commentsRes.comments;

    newComment.value = '';

    window.location.reload()
  }
};


</script>


<style scoped>
.page-container {
  padding: 20px;
  width: 180vh;
  margin: 0 auto;
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
  width: 200px;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  user-select: none;
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
  font-size: 0.5em;
  margin: 15px 0;
  line-height: 1.6;
}

.action-buttons {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.like-button,
.collect-button,
.unlike-button {
  display: flex;
  align-items: center;
  border: none;
  font-size: 1em;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
  color: #555;
  transition: background-color 0.2s;
}

.like-button,
.collect-button {
  background-color: #f0f0f0;
}

.unlike-button {
  background-color: rgba(104, 143, 113, 0.74);
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

.comment-header {
  display: flex;
  align-items: center;
  gap: 10px; /* 头像和用户名之间的间距 */
}

.comment-content {
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.comment-user-name {
  font-weight: bold;
}

.comment-text {
  margin-top: 5px;
  word-wrap: break-word;
}

.text-section input {
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
