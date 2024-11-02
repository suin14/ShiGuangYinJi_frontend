<template>
  <div
      @mouseenter="openSidebar"
      @mouseleave="closeSidebar"
      :class="['sidebar', { 'closed': isSidebarClosed }]"
  >
    <div class="head" style="--bg: #333;">
      <ul>
        <li>
          <a href="#">
            <div class="icon">
              <img src="@/assets/vue.svg" alt="" />
            </div>
            <div class="name">Website</div>
          </a>
        </li>
      </ul>
    </div>

    <div class="menu-list">
      <ul>
        <li @click="setActiveItem('home')" :class="{ active: activeItem === 'home' }">
          <a href="#">
            <div class="icon">
              <img src="@/assets/icon/home.svg" alt="" />
            </div>
            <div class="text">主页</div>
          </a>
        </li>
        <li @click="setActiveItem('create')" :class="{ active: activeItem === 'create' }">
          <a href="#">
            <div class="icon">
              <img src="@/assets/icon/edit.svg" alt="" />
            </div>
            <div class="text">创作</div>
          </a>
        </li>
      </ul>
    </div>

    <div class="bottom">
      <ul>
        <li>
          <a href="#">
            <div class="icon">
              <div class="avatar"></div>
            </div>
            <div class="text">UserName</div>
          </a>
        </li>
        <li>
          <a href="#">
            <div class="icon">
              <img src="@/assets/icon/quit.svg" alt="" />
            </div>
            <div class="text">登出</div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isSidebarClosed = ref(true);
const activeItem = ref('home'); // 默认激活的菜单项为 home

function openSidebar() {
  isSidebarClosed.value = false; // 鼠标悬浮时打开侧边栏
}

function closeSidebar() {
  isSidebarClosed.value = true; // 鼠标离开时关闭侧边栏
}

function setActiveItem(item) {
  activeItem.value = item; // 设置激活的菜单项
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  z-index: 1000;
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
}

ul li.active {
  background-color: rgb(222, 222, 222);
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
  box-shadow: 5px 5px 0 5px rgb(222, 222, 222);
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
  box-shadow: 5px -5px 0 5px rgb(222, 222, 222);
  background: transparent;
}

ul li a {
  position: relative;
  display: flex;
  white-space: nowrap;
  text-decoration: none;
}

ul li a .icon {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 60px;
  height: 60px;
  font-size: 1.5em;
  transition: 0.5s;
  padding-left: 5px;
}

ul li.active a .icon::before {
  content: '';
  position: absolute;
  inset: 5px;
  width: 55px;
  background: rgba(123, 145, 128, 0.74);
  border-radius: 50%;
  transition: 0.5s;
  z-index: -100;
}

ul li a .icon img {
  width: 35px;
  height: auto;
}

ul li a .text, .name {
  height: 60px;
  display: flex;
  align-items: center;
  font-size: 1.1em;
  color: #242424;
  padding-left: 15px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.name {
  font-size: 1.2em;
}

ul li:hover a .text {
  color: rgba(1, 50, 12, 0.74);
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
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-image: url('@/assets/icon/avatar.jpg');
  background-size: cover;
  background-position: center;
}
</style>
