<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Calendar from "@/components/Calendar.vue";
const currentView = ref('我的');
const router = useRouter();

const switchView = (view) => {
  currentView.value = view;
};

function gotoAdmin() {
  router.push({ path: '/admin' });
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
        <div v-if="currentView === '我的'">
          <Calendar />
        </div>
        <div v-if="currentView === '草稿箱'">草稿箱</div>
        <div v-if="currentView === '回收站'">回收站</div>
        <div v-if="currentView === '收藏'">我收藏过的文章</div>
      </div>
    </div>

    <div class="right-box">
      <div class="avatar">
        <div class="icon">
          <div class="avatar-img" ></div>
        </div>
        <div class="text">
          <span style="margin-right: 5px">Momo</span>
          <img class="editBtn" src="@/assets/icon/edit.svg" alt="" @click="">
        </div>
      </div>
      <div style="margin-bottom: 10px"><span>发布: 0</span><span style="margin-left: 10px">关注: 0</span></div>
      <span>个人资料...</span>
      <button @click="gotoAdmin" class="btn-admin">
        <span>管理员模式</span>
      </button>
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

.active {
  font-weight: bold;
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

</style>
