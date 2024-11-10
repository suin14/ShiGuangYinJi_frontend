<script setup>
import {ref} from "vue";
import GroupsCard from "@/components/GroupsCard.vue";
import groupIcon from '@/assets/icon/group.svg';
import vueImage from "@/assets/test1.png";
import avatarImage from "@/assets/icon/avatar.jpg";
import testImage from "@/assets/icon/avatar.jpg";


const searchInput = ref('');

const groupDetail = ref([
  {
    imageSrc: groupIcon,
    name: 'Vue3',
    member: 233
  },
  {
    imageSrc: groupIcon,
    name: '编程小组',
    member: 120111
  },
  {
    imageSrc: groupIcon,
    name: 'Java',
    member: 250
  },
  {
    imageSrc: groupIcon,
    name: 'C++',
    member: 521
  },
  {
    imageSrc: groupIcon,
    name: 'Python',
    member: 12100
  },


]);

const cards = ref([
  {
    imageSrc: vueImage,
    title: '欢迎来到主页',
    userAvatar: avatarImage,
    userName: 'Momo',
    content: '这是主页的简介，欢迎了解更多信息。这是主页的简介，欢迎了解更多信息。这是主页的简介，欢迎了解更多信息。这是主页的简介，欢迎了解更多信息。这是主页的简介，欢迎了解更多信息。这是主页的简介，欢迎了解更多信息。'
  },
  {
    imageSrc: testImage,
    title: '开发者社区',
    userAvatar: avatarImage,
    userName: '张三',
    content: '加入我们的开发者社区，与技术爱好者共同交流。'
  },
  {
    imageSrc: vueImage,
    title: 'Vue 3 教程',
    userAvatar: avatarImage,
    userName: '李四',
    content: '学习 Vue 3 的基础知识，掌握现代化前端框架的核心概念。'
  },
  {
    imageSrc: testImage,
    title: 'JavaScript 学习',
    userAvatar: avatarImage,
    userName: '王五',
    content: '深入了解 JavaScript 语言，成为一个前端开发高手。'
  },
  {
    imageSrc: vueImage,
    title: '欢迎来到主页',
    userAvatar: avatarImage,
    userName: 'Momo',
    content: '这里是一个欢迎页面，包含了相关的最新动态和推荐内容。'
  },
  {
    imageSrc: testImage,
    title: '开发者社区',
    userAvatar: avatarImage,
    userName: '张三',
    content: '加入社区获取关于技术文章、开源项目以及开发资源的最新资讯。'
  },
  {
    imageSrc: vueImage,
    title: 'Vue 3 教程',
    userAvatar: avatarImage,
    userName: '李四',
    content: '本教程适合初学者，快速掌握 Vue 3 的核心知识点。'
  },
  {
    imageSrc: testImage,
    title: 'JavaScript 学习',
    userAvatar: avatarImage,
    userName: '王五',
    content: '提供详细的 JavaScript 教程，帮助你解决开发中遇到的问题。'
  }
]);

const clearInput = () => {
  searchInput.value = '';
};

const showForm = ref(false);  // 控制表格的显示/隐藏
const newGroup = ref({
  name: '',
  image: null,
});
const handleFormSubmit = () => {
  // 提交表单，添加新兴趣组
  console.log('提交的兴趣组:', newGroup.value);

  // 你可以将新兴趣组添加到groupDetail数组中
  groupDetail.value.push({
    imageSrc: newGroup.value.image || groupIcon, // 如果没有上传图片，使用默认图标
    name: newGroup.value.name,
    member: 0, // 初始成员数
  });

  // 清空表单
  newGroup.value = { name: '', image: null };
  showForm.value = false;
};

const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    newGroup.value.image = URL.createObjectURL(file);  // 创建文件的URL
  }
};

const cancelForm = () => {
  newGroup.value = { name: '', image: null };  // 清空表单数据
  showForm.value = false;  // 隐藏表单
};
</script>

<template>
  <div class="container">
    <div class="left-box">
      <div class="input-box">
        <input
            type="text"
            class="search-input"
            placeholder="搜索..."
            v-model="searchInput"
        />
        <div class="input-button">
          <div class="close-icon" v-if="searchInput" @click="clearInput">
            <img src="@/assets/icon/close.svg" alt="关闭" />
          </div>
          <div class="search-icon">
            <img src="@/assets/icon/search.svg" alt="搜索" />
          </div>
          <div class="create-icon" @click="showForm = !showForm">
            <img src="@/assets/icon/add.svg" alt="创建" />
          </div>
        </div>
      </div>
      <div class="groups-list-container">
        <GroupsCard
            v-for="(group, index) in groupDetail"
            :key="index"
            :image="group.imageSrc"
            :name="group.name"
            :members="group.member"
        />
      </div>
    </div>


    <div class="right-box">

        <div class="group-header">
          <img :src="groupDetail[0].imageSrc" alt="Group Image" class="group-image" />
          <div class="text-columns">
            <div class="group-name">{{ groupDetail[0].name }}</div>
            <div class="group-members">人数：{{ groupDetail[0].member }}人</div>
          </div>

          <button class="follow-button">关注</button>
        </div>
        <hr class="divider" />

        <div class="group-content">
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

  <div v-if="showForm" class="create-btn-container">
    <div class="form-container">
      <form @submit.prevent="handleFormSubmit">
        <div class="form-group">
          <label for="groupName">兴趣组名字:</label>
          <input
              type="text"
              id="groupName"
              v-model="newGroup.name"
              required
              placeholder="输入兴趣组名字"
          />
        </div>
        <div class="form-group">
          <label for="groupImage">上传图片:</label>
          <input
              type="file"
              id="groupImage"
              @change="handleImageChange"
              accept="image/*"
          />
        </div>
        <button type="submit" class="submit-btn">提交</button>
        <button type="button" @click="cancelForm" class="cancel-btn">取消</button>
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
  flex: 1;
  background-color: #f6f6f6;
  padding: 3vh;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgb(128, 128, 128);
  height: 75vh;
  margin-top: 5vh;
}

.input-box {
  margin-top: 4vh;
  width: auto;
  height: 40px;
  position: relative;
  left: 50%;
  transform: translate(-50%);
  display: flex;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 999px;
  overflow: hidden;
  margin-bottom: 20px;
}

.search-input {
  padding: 0 20px;
  width: 100%;
  height: 100%;
  font-size: 16px;
  color: #333;
  caret-color: rgba(1, 50, 12, 0.74);
  background: #fff;
  border: none;
  outline: none;
  border-radius: 999px;
  transition: background-color 0.3s ease;
}

.search-input::placeholder {
  color: rgba(51, 51, 51, 0.5);
}

.search-input:focus {
  background-color: #fff;
}

.input-button {
  display: flex;
  align-items: center;
  height: 100%;
  padding-right: 20px;
}

.create-icon img,
.close-icon img,
.search-icon img {
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: transform 0.3s ease;
  padding-left: 10px;
  padding-top: 5px;
}

.create-icon img:hover,
.close-icon img:hover,
.search-icon img:hover {
  transform: scale(1.1);
}

.groups-list-container {
  flex-direction: row;
  flex-wrap: wrap;
  height: 60vh;
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
}

.groups-list-container > * {
  flex-shrink: 0;
  width: 270px;
  margin-right: 10px;
  margin-bottom: 10px;
}

/* 美化滚动条 */
.groups-list-container::-webkit-scrollbar {
  width: 10px;
}

.groups-list-container::-webkit-scrollbar-thumb {
  background: white;
  border-radius: 10px;
}

.groups-list-container::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.group-header {
  display: flex;
  align-items: center;
}

.group-image {
  width: 80px;
  height: 80px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 16px;
  background-color: lightgray;
}

.text-columns {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  margin-left: 15px;
}

.group-name {
  font-size: 1.5em;
  font-weight: 600;
  font-family: 'ShangGuB', sans-serif;
}

.group-members {
  font-size: 14px;
  color: #888;
  margin-top: 4px;
}

.follow-button {
  padding: 6px 12px;
  background-color: #e3e2e2;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  color: #555;
  cursor: pointer;
  margin-right: 15px;
}

.follow-button:hover {
  background-color: lightgray;
}

hr.divider {
  border: 1px solid #ccc;
  margin: 20px 10px 10px 0;
}

.right-box {
  flex: 3;
  background-color: #f6f6f6;
  padding: 3vh;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgb(128, 128, 128);
  height: 75vh;
  margin-top: 5vh;
  margin-left: 5vh;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.group-content {
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
.group-content::-webkit-scrollbar {
  width: 10px;
}

.group-content::-webkit-scrollbar-thumb {
  background: white;
  border-radius: 10px;
}

.group-content::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}


.create-btn-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}


.form-container {
  margin-top: 20px;
  background-color: #f6f6f6;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  user-select: none;
}

.form-group {
  margin: 15px 20px 20px 5px;
}

.form-group label {
  font-size: 16px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #fff;
  margin-top: 15px;
}

.cancel-btn,
.submit-btn {
  padding: 10px 20px;
  background-color: #3d493f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 15px;
  outline: none;
}

.cancel-btn:hover,
.submit-btn:hover {
  background-color: #546256;
}
</style>
