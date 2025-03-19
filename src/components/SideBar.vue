<template>
  <div
      @mouseenter="openSidebar"
      @mouseleave="closeSidebar"
      :class="['sidebar', { 'closed': isSidebarClosed }]"
  >
    <div class="head" style="--bg: #333;">
      <ul>
        <li>
            <div class="logo">
              <img src="@/assets/vue.svg" alt="" />
            </div>
            <div class="name">时光日记</div>
        </li>
      </ul>
    </div>

    <div class="menu-list">
      <ul>
        <li @click="setActiveItem('首页', '/index')" :class="{ active: activeItem === '首页' }">
            <div class="icon">
              <img src="@/assets/icon/home.svg" alt="首页" />
            </div>
            <div class="text">主页</div>
        </li>
        <li @click="setActiveItem('编辑器', '/editor')" :class="{ active: activeItem === '编辑器' }">
            <div class="icon">
              <img src="@/assets/icon/edit.svg" alt="编辑器" />
            </div>
            <div class="text">创作</div>
        </li>
        <li @click="setActiveItem('通知', '/message')" :class="{ active: activeItem === '通知' }">
          <div class="icon">
            <img src="@/assets/icon/message.svg" alt="通知" />
          </div>
          <div class="text">通知</div>
        </li>
        <li @click="setActiveItem('兴趣组', '/groups')" :class="{ active: activeItem === '兴趣组' }">
          <div class="icon">
            <img src="@/assets/icon/group.svg" alt="兴趣组" />
          </div>
          <div class="text">兴趣组</div>
        </li>
        <li @click="setActiveItem('智能体', '/agent')" :class="{ active: activeItem === '智能体' }">
          <div class="icon">
            <img src="@/assets/icon/ai.svg" alt="智能体" />
          </div>
          <div class="text">智能写作</div>
        </li>
      </ul>
    </div>

    <div class="bottom">
      <ul>
        <li @click="setActiveItem('', '/user')">

              <img :src="`${userAvatar}`" alt="用户头像" class="avatar" />

            <div class="text">我的</div>
        </li>

        <li @click="logout">
          <div class="icon">
            <img src="@/assets/icon/logout.svg" alt="" />
          </div>
          <div class="text">
            <div v-if="checkLogin" @click="logout">登出</div>
            <div v-else @click="setActiveItem('登录', '/login')">登录</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, computed} from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import {GetUserAvatar, Logout} from "@/api/api.js";

const router = useRouter();
const store = useStore();

const isSidebarClosed = ref(true);
const activeItem = ref('首页');

const checkLogin = computed(() => store.state.checkLogin);
let userAvatar = 'http://127.0.0.1:8000/media/avatars/avatar.png';

onMounted(async () => {
  const token = localStorage.getItem('token');
  store.commit('setLoginState', !!token);

  const avatarData = await GetUserAvatar();
  if (avatarData != null)
    userAvatar = avatarData.avatar_url

  console.log(userAvatar)
});

function openSidebar() {
  isSidebarClosed.value = false;
}

function closeSidebar() {
  isSidebarClosed.value = true;
}

function setActiveItem(item, link) {
  activeItem.value = item;
  router.push({ path: link });
}

async function logout() {
  try {
    await Logout();
    userAvatar = 'http://127.0.0.1:8000/media/avatars/avatar.png'
    console.log("登出请求成功");
  } catch (error) {
    console.error("登出失败:", error.response?.data || error.message);
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    console.log("token 已清除");

    store.commit('setLoginState', false);

    await router.push('/login');
  }
}
</script>


<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  z-index: 1000;
  font-family: 'ShangGuB', sans-serif;
}

.sidebar {
  min-height: 90vh;
  background-color: white;
  position: absolute;
  width: 220px;
  transition: 0.5s;
  padding-left: 5px;
  overflow: hidden;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  box-shadow: 2px 2px 10px rgb(128, 128, 128);
  user-select: none;
}

.sidebar.closed {
  width: 80px;
  transition: 0.5s;
}

.head {
  margin-top: 10px;
}

.head .icon {
  font-size: 2em;
}

.head .text {
  font-size: 1.2em;
  font-weight: 500;
  color: #242424;
}

ul {
  position: relative;
}

ul li {
  position: relative;
  list-style: none;
  display: flex;
  white-space: nowrap;
  text-decoration: none;
  cursor: pointer;
}

ul li.active {
  background-color: #899a8c;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
}

ul li.active::before {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  top: -20px;
  right: 5px;
  border-bottom-right-radius: 20px;
  box-shadow: 5px 5px 0 5px #899a8c;
  background: transparent;
}

ul li.active::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  bottom: -20px;
  right: 5px;
  border-top-right-radius: 20px;
  box-shadow: 5px -5px 0 5px #899a8c;
  background: transparent;
}

ul li .icon,
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 60px;
  height: 60px;
  font-size: 1.5em;
  transition: 0.5s;
  padding-left: 5px;
  cursor: pointer;
}

ul li.active .icon::before {
  content: '';
  position: absolute;
  inset: 5px;
  width: 55px;
  background: white;
  border-radius: 50%;
  transition: 0.5s;
  z-index: -100;
}

ul li:hover .icon img,
ul li:hover .icon .avatar,
ul li:hover .text {
  transform: scale(1.1);
}

ul li .icon img,
.logo img {
  width: 35px;
  height: auto;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

ul li .text, .name {
  height: 60px;
  display: flex;
  align-items: center;
  font-size: 1.2em;
  color: #363636;
  padding-left: 15px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: transform 0.3s ease-in-out;
}

.name {
  font-size: 1.7em;
  font-family: ChangErFeiBai, sans-serif;
}

ul li:hover .text {
  color: #3d493f;
}

.menu-list {
  position: absolute;
  top: 12vh;
  width: 100%;
}

.bottom {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding-bottom: 5px;
}

.avatar {
  min-width: 50px;
  height: 50px;
  margin: 10px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center 20%;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}
</style>
