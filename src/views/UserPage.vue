<script setup>
import {computed, ref} from 'vue';
import { useRouter } from 'vue-router';
import Calendar from "@/components/Calendar.vue";
import vueImage from "@/assets/vue.svg";
import avatarImage from "@/assets/icon/avatar.jpg";
import testImage from "@/assets/test.jpg";
const currentView = ref('我的');
const router = useRouter();

const switchView = (view) => {
  currentView.value = view;
};

function gotoAdmin() {
  router.push({ path: '/admin' });
}

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


const isEditing = ref(false);  // 用于控制是否显示编辑表单
const userInfo = ref({
  name: 'Momo',
  intro: '这里是个人介绍。',
  avatar: avatarImage
});
// 保存表单数据
const saveUserInfo = () => {
  isEditing.value = false; // 关闭编辑框
  // 这里可以添加保存逻辑，比如发送到服务器等
};

// 头像选择
const handleAvatarChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      userInfo.value.avatar = reader.result;
    };
    reader.readAsDataURL(file);
  }
};
</script>

<template>
  <div class="container">
    <div class="left-box">
      <div class="top-navi">
        <span @click="switchView('我的')" :class="{ active: currentView === '我的' }">我的</span>
        <span> | </span>
        <span @click="switchView('草稿箱')" :class="{ active: currentView === '草稿箱' }">草稿箱</span>
        <span> | </span>
        <span @click="switchView('回收站')" :class="{ active: currentView === '回收站' }">回收站</span>
        <span> | </span>
        <span @click="switchView('收藏')" :class="{ active: currentView === '收藏' }">收藏</span>
      </div>
      <div class="left-box-content">
        <div v-if="currentView === '我的'" class="my-content">
          <div class="calendar-container">
            <Calendar />
          </div>

          <div class="cards-container">
            <div v-for="(card, index) in cards" :key="index" class="content-card">
              <img :src="card.imageSrc" alt="Card Image" class="card-image" />

              <div class="card-content">
                <h3 class="card-title">{{ card.title }}</h3>
                <span>{{ card.content }}</span>
              </div>

              <div class="card-btn">
                <img src="@/assets/icon/edit.svg" alt="" @click="">
                <img src="@/assets/icon/close.svg" alt="" @click="">
              </div>
            </div>
          </div>
        </div>

        <div v-if="currentView === '草稿箱'">
          <div class="cards-container">
            <div v-for="(card, index) in cards" :key="index" class="content-card">
              <img :src="card.imageSrc" alt="Card Image" class="card-image" />

              <div class="card-content">
                <h3 class="card-title">{{ card.title }}</h3>
                <span>{{ card.content }}</span>
              </div>

              <div class="card-btn">
                <img src="@/assets/icon/edit.svg" alt="" @click="">
                <img src="@/assets/icon/close.svg" alt="" @click="">
              </div>
            </div>
          </div>
        </div>

        <div v-if="currentView === '回收站'">
          <div class="cards-container">
            <div v-for="(card, index) in cards" :key="index" class="content-card">
              <img :src="card.imageSrc" alt="Card Image" class="card-image" />

              <div class="card-content">
                <h3 class="card-title">{{ card.title }}</h3>
                <span>{{ card.content }}</span>
              </div>

              <div class="card-btn">
                <img src="@/assets/icon/reserve.svg" alt="" @click="">
              </div>
            </div>
          </div>
        </div>

        <div v-if="currentView === '收藏'">
          <div class="cards-container">
            <div v-for="(card, index) in cards" :key="index" class="content-card">
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
          </div>
        </div>
      </div>
    </div>

    <div class="right-box">
      <div class="avatar">
        <div class="icon">
          <div class="avatar-img" ></div>
        </div>
        <div class="text">
          <span style="margin-right: 5px">Momo</span>
          <img class="editBtn" src="@/assets/icon/edit.svg" alt="" @click="isEditing = true" >
        </div>
      </div>
      <div style="margin-bottom: 10px"><span>发布: 0</span><span style="margin-left: 10px">关注: 0</span></div>
      <span>个人资料...</span>
      <button @click="gotoAdmin" class="btn-admin">
        <span>管理员模式</span>
      </button>
    </div>
  </div>

  <div class="modal" v-if="isEditing">
    <div class="modal-content">
      <h2>编辑个人资料</h2>
      <form @submit.prevent="saveUserInfo">
        <div class="form-group">
          <label for="name">名字:</label>
          <input v-model="userInfo.name" id="name" type="text" required />
        </div>
        <div class="form-group">
          <label for="intro">个人介绍:</label>
          <textarea v-model="userInfo.intro" id="intro" required></textarea>
        </div>
        <div class="form-group">
          <label for="avatar">头像:</label>
          <input type="file" @change="handleAvatarChange" />
          <div class="avatar-preview">
            <img :src="userInfo.avatar" alt="头像" class="avatar-image" />
          </div>
        </div>
        <div class="form-actions">
          <button type="submit">保存</button>
          <button type="button" @click="isEditing = false">取消</button>
        </div>
      </form>
    </div>
  </div>

</template>

<style scoped>
.container {
  display: flex;
  width: 188vh;
  user-select: none;
  position: relative;
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
}

.top-navi {
  margin-bottom: 4vh;
  cursor: pointer;
  user-select: none;
}

.top-navi span{
  font-size: 1.3em;
}

.top-navi span:hover {
  color: #213547;
}

.active {
  color: #213547;
  font-family: 'ShangGuB', sans-serif;
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

.avatar {
  margin: 10px 0 10px 0;
}

.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 120px;
  height: 120px;
  font-size: 1.5em;
  transition: 0.5s;
  padding-left: 5px;
  margin-bottom: 10px;
}

.avatar-img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-image: url('@/assets/icon/avatar.jpg');
  background-size: cover;
  background-position: center;
  cursor: pointer;
}

.btn-admin {
  height: 40px;
  position: absolute;
  bottom: 25vh;
  right: 15vh;
  border: none;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  background-color: #29342f;
}

.btn-admin:hover {
  background-color: #444343;
  transform: scale(1.1);
  outline: none;
}

.btn-admin span{
  font-size: 1.0em;
  font-weight: bold;
  font-family: 'ShangGuB', sans-serif;
}

.editBtn {
  width: 16px;
  height: 16px;
  background-size: cover;
  background-position: center;
  cursor: pointer;
}

.my-content {
  display: flex;
  gap: 20px;
}

.calendar-container {
  flex: 1;
  max-width: 320px;
  margin-right: 10px;
}

.cards-container {
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow-y: auto;
  max-height: 65vh;
  padding-bottom: 5px;
}

.content-card {
  display: flex;
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
  margin: 5px 20px 5px 10px;
  box-shadow: 1px 1px 8px rgb(128, 128, 128);
  justify-content: space-between;
  align-items: center;
}

.card-image {
  width: 60px;
  height: 60px;
  margin-right: 25px;
}

.card-content {
  flex-grow: 1;
  padding: 0 10px;
  text-align: left;
  width: auto;
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
.cards-container::-webkit-scrollbar {
  width: 10px;
}

.cards-container::-webkit-scrollbar-thumb {
  background: white;
  border-radius: 10px;
}

.cards-container::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.card-btn img {
  width: 22px;
  height: 22px;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  margin-right: 10px;
}

/* 编辑表格 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  max-width: 100%;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 7px;
}

.form-group input,
.form-group textarea {
  width: 90%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: white;
  color: black;
}

.avatar-preview img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-top: 10px;
}

.form-actions {
  display: flex;
  justify-content: center;
  gap: 25px;
}

.form-actions button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #3d493f;
  color: white;
  outline: none;
}

.form-actions button:hover {
  background-color: #546256;
  outline: none;
}
</style>
