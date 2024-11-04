<template>
  <div
      @mouseenter="openSidebar"
      @mouseleave="closeSidebar"
      :class="['sidebar', { 'closed': isSidebarClosed }]"
  >
    <div class="head" style="--bg: #333;">
      <ul>
        <li>
            <div class="icon">
              <img src="@/assets/vue.svg" alt="" />
            </div>
            <div class="name">Website</div>
        </li>
      </ul>
    </div>

    <div class="menu-list">
      <ul>
        <li @click="setActiveItem('index', '/index')" :class="{ active: activeItem === 'index' }">
            <div class="icon">
              <img src="@/assets/icon/home.svg" alt="" />
            </div>
            <div class="text">主页</div>
        </li>
        <li @click="setActiveItem('editor', '/editor')" :class="{ active: activeItem === 'editor' }">
            <div class="icon">
              <img src="@/assets/icon/edit.svg" alt="" />
            </div>
            <div class="text">创作</div>
        </li>
      </ul>
    </div>

    <div class="bottom">
      <ul>
        <li @click="setActiveItem('', '/user')">
            <div class="icon">
              <div class="avatar" ></div>
            </div>
            <div class="text">UserName</div>
        </li>
        <li>
            <div class="icon">
              <img src="@/assets/icon/logout.svg" alt="" />
            </div>
            <div class="text">登出</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isSidebarClosed = ref(true);
const activeItem = ref('index');

function openSidebar() {
  isSidebarClosed.value = false;
}

function closeSidebar() {
  isSidebarClosed.value = true;
}

function setActiveItem(item, link) {
  activeItem.value = item;
  router.push(link).catch(err => console.error(err));
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
  background-color: rgba(123, 145, 128, 1);
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
  box-shadow: 5px 5px 0 5px rgba(123, 145, 128, 1);;
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
  box-shadow: 5px -5px 0 5px rgba(123, 145, 128, 1);;
  background: transparent;
}

ul li .icon {
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

ul li .icon img {
  width: 35px;
  height: auto;
  cursor: pointer;
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
  font-weight: bold;
}

.name {
  font-size: 1.2em;
}

ul li:hover .text {
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
  cursor: pointer;
}
</style>
