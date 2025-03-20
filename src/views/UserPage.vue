<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Calendar from "@/components/Calendar.vue";
import vueImage from "@/assets/vue.svg";
import avatarImage from "@/assets/avatar.png";
import testImage from "@/assets/test.jpg";
const currentView = ref('我的');
const router = useRouter();
import {GetUserProfile, UpdateUserProfile, GetUserAvatar, getUserDocuments, deleteUserDocument} from "@/api/api.js";

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
  { imageSrc: testImage, title: 'JavaScript 学习', userAvatar: avatarImage, userName: '王五', content: '深入了解 JavaScript 语言' }
]);

let isEditing = ref(false);
const userInfo = ref({
  name: '',
  intro: '',
  article: 0,
  fans: 0,
  avatar: 'avatar.png'
});

const changeUserInfo = ref({
  name: '',
  intro: '',
  avatar: 'avatar.png',
  avatarPreview: 'avatar.png',
});

const documents = ref([]);

onMounted(async () => {
  const profileData = await GetUserProfile();
  userInfo.value.name = profileData.nickname;
  userInfo.value.intro = profileData.introduction;
  userInfo.value.article = profileData.article_count;
  userInfo.value.fans = profileData.fans_count;
  const avatarData = await GetUserAvatar();
  userInfo.value.avatar = avatarData.avatar_url
  // console.log(userInfo.value);

  try {
    const res = await getUserDocuments();
    if (res.success) {
      documents.value = res.data;
    } else {
      alert("获取文档失败，请稍后重试");
    }
  } catch (error) {
    alert("无法获取文档，请检查网络");
  }
});

const saveUserInfo = () => {
  isEditing.value = false;
};

const handleAvatarChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    changeUserInfo.value.avatar = file;

    const reader = new FileReader();
    reader.onload = () => {
      changeUserInfo.value.avatarPreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
};

async function updateProfile() {
  try {
    const formData = new FormData();
    formData.append('nickname', changeUserInfo.value.name);
    formData.append('introduction', changeUserInfo.value.intro);

    if (changeUserInfo.value.avatar instanceof File) {
      formData.append('avatar', changeUserInfo.value.avatar);
    }

    const response = await UpdateUserProfile(
        changeUserInfo.value.name,
        changeUserInfo.value.intro,
        changeUserInfo.value.avatar
    );

    // alert("资料更新成功");
    window.location.reload();
  } catch (error) {
    alert("更新失败，请稍后再试");
  }
}

async function editUserProfile() {
  isEditing.value = true;

  changeUserInfo.value.name = userInfo.value.name;
  changeUserInfo.value.intro = userInfo.value.intro;
  changeUserInfo.value.avatar = userInfo.value.avatar;
  changeUserInfo.value.avatarPreview = userInfo.value.avatar;
}

async function handleDeleteDocument(docId) {
  if (!confirm("确定要删除这个文档吗？")) {
    return;
  }

  try {
    const res = await deleteUserDocument(docId);
    if (res.success) {
      alert("文档删除成功");
      documents.value = documents.value.filter(doc => doc.id !== docId); // 更新前端数据
    } else {
      alert("删除失败，请稍后重试");
    }
  } catch (error) {
    alert("无法删除文档，请检查网络");
  }
}
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
            <div v-for="(doc, index) in documents" :key="index" class="content-card">
<!--              <img :src="card.imageSrc" alt="Card Image" class="card-image" />-->

              <div class="card-content">
                <h3 class="card-title">{{ doc.title }}</h3>
                <span>{{ doc.content }}</span>
              </div>

              <div class="card-btn">
                <img src="@/assets/icon/edit.svg" alt="" @click="">
                <img src="@/assets/icon/close.svg" alt="" @click="handleDeleteDocument(doc.id)">
              </div>
            </div>
          </div>
        </div>

        <div v-if="currentView === '草稿箱'">
          <div class="cards-container">
            <div v-for="(doc, index) in documents" :key="index" class="content-card">
<!--              <img :src="card.imageSrc" alt="Card Image" class="card-image" />-->

              <div class="card-content">
                <h3 class="card-title">{{ doc.title }}</h3>
                <span>{{ doc.content }}</span>
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
                  <img v-if="userInfo.avatar" :src="userInfo.avatar" alt="用户头像" />
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
          <img :src="`${userInfo.avatar}`" alt="用户头像" class="avatar-image"/>
        </div>
        <div class="text">
          <span style="margin-right: 5px">{{ userInfo.name }}</span>
          <img class="editBtn" src="@/assets/icon/edit.svg" alt="" @click="editUserProfile" >
        </div>
      </div>
      <div style="margin-bottom: 10px"><span>发布: {{ userInfo.article }}</span><span style="margin-left: 10px">粉丝: {{ userInfo.fans }}</span></div>
      <span style="font-size: small">{{ userInfo.intro }}</span>

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
          <input v-model="changeUserInfo.name" id="name" type="text" required maxlength="5"/>
        </div>
        <div class="form-group">
          <label for="intro">个人介绍:</label>
          <textarea v-model="changeUserInfo.intro" id="intro" required maxlength="50"></textarea>
        </div>
        <div class="form-group">
          <label for="avatar">头像:</label>
          <input type="file" @change="handleAvatarChange" />
          <div class="avatar-preview">
            <img :src="`${changeUserInfo.avatarPreview}`" alt="用户头像预览" class="avatar-image"/>
          </div>
        </div>
        <div class="form-actions">
          <button type="submit" @click="updateProfile">保存</button>
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
  width: 120px;
  height: 120px;
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
