<script setup>
import {ref, onMounted, onUpdated, nextTick, onBeforeUnmount} from 'vue';
import HomeCard from "@/components/HomeCard.vue";
import CardDetail from "@/components/CardDetail.vue";
import vueImage from '@/assets/vue.svg';
import testImage from "@/assets/test.jpg";
import avatarImage from '@/assets/avatar.png';
import router from "@/router/index.js";

const searchInput = ref('');
const currentView = ref('推荐');

const cards = ref([
  {
    imageSrc: vueImage,
    title: '欢迎来到主页',
    userAvatar: avatarImage,
    userName: 'Momo',
    content: '欢迎来到我们的网站，这是一个汇聚了最新资讯和实用教程的地方，期待您的到来！'
  },
  {
    imageSrc: testImage,
    title: '开发者社区',
    userAvatar: avatarImage,
    userName: '张三',
    content: '这里是开发者社区，我们致力于为开发者提供一个互相学习、共同进步的交流平台。'
  },
  {
    imageSrc: vueImage,
    title: 'Vue 3 教程',
    userAvatar: avatarImage,
    userName: '李四',
    content: '在这篇文章中，我们将介绍 Vue 3 的基本用法以及如何构建更高效的前端应用程序。'
  },
  {
    imageSrc: testImage,
    title: 'JavaScript 学习',
    userAvatar: avatarImage,
    userName: '王五',
    content: 'JavaScript 是现代 Web 开发的基石。本教程将帮助您掌握从基础到高级的 JavaScript 技巧。'
  },
  {
    imageSrc: vueImage,
    title: '欢迎来到主页',
    userAvatar: avatarImage,
    userName: 'Momo',
    content: '欢迎来到我们的网站，这是一个汇聚了最新资讯和实用教程的地方，期待您的到来！'
  },
  {
    imageSrc: testImage,
    title: '开发者社区',
    userAvatar: avatarImage,
    userName: '张三',
    content: '这里是开发者社区，我们致力于为开发者提供一个互相学习、共同进步的交流平台。'
  },
  {
    imageSrc: vueImage,
    title: 'Vue 3 教程',
    userAvatar: avatarImage,
    userName: '李四',
    content: '在这篇文章中，我们将介绍 Vue 3 的基本用法以及如何构建更高效的前端应用程序。'
  },
  {
    imageSrc: testImage,
    title: 'JavaScript 学习',
    userAvatar: avatarImage,
    userName: '王五',
    content: 'JavaScript 是现代 Web 开发的基石。本教程将帮助您掌握从基础到高级的 JavaScript 技巧。'
  }
]);


const topics= ref(['冬日摄影', '考研']);

const switchView = (view) => {
  currentView.value = view;
};

const clearInput = () => {
  searchInput.value = '';
};

const setCardHeights = () => {
  nextTick(() => {
    const cardElements = document.querySelectorAll('.waterfall-item');
    const container = document.querySelector('.waterfall');
    const columnCount = Math.floor(container.offsetWidth / 250);
    const columns = Array(columnCount).fill(0);

    cardElements.forEach(card => {
      const minColumnHeight = Math.min(...columns);
      const index = columns.indexOf(minColumnHeight);

      card.style.top = `${minColumnHeight}px`;
      card.style.left = `${index * 300}px`;

      columns[index] += card.offsetHeight + 20;
    });
  });
};

// 页面加载后调整瀑布流布局
onMounted(() => {
  setCardHeights();

  window.onload = () => {
    setCardHeights();  // 确保在页面加载完成后执行瀑布流布局计算
  };

  // 监听窗口大小变化时，重新调整瀑布流布局
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(setCardHeights, 200);
  });
});

// 监听视图切换，重新调整瀑布流布局
onUpdated(() => {
  if (currentView.value === '推荐') {
    setCardHeights();
  }
});

// 在组件销毁时，移除事件监听
onBeforeUnmount(() => {
  window.removeEventListener('resize', setCardHeights);
});

const showDetail = ref(false); // 控制弹窗显示
const selectedCard = ref(null); // 当前选中的卡片

const openCardDetail = (card) => {
  selectedCard.value = card;
  showDetail.value = true;
};

const closeCardDetail = () => {
  showDetail.value = false;
  selectedCard.value = null;
};

function gotoArticle() {
  router.push({ path: '/card' });
}
</script>

<template>
  <div class="main-page">
    <div class="input-box">
      <input
          type="text"
          class="search-input"
          placeholder="搜索..."
          v-model="searchInput"
          @keyup.enter=""
      />
      <div class="input-button">
        <div class="close-icon" v-if="searchInput" @click="clearInput">
          <img src="@/assets/icon/close.svg" alt="关闭" />
        </div>
        <div class="search-icon">
          <img src="@/assets/icon/search.svg" alt="搜索" />
        </div>
      </div>
    </div>

    <div class="content">
      <div class="top-navi">
        <span @click="switchView('推荐')" :class="{ active: currentView === '推荐' }">推荐</span>
        <span @click="switchView('关注')" :class="{ active: currentView === '关注' }">关注</span>
        <span
            v-for="(t, index) in topics"
            :key="index"
            @click="switchView(t)"
            :class="{ active: currentView === t }"
        >
          {{ t }}
        </span>
      </div>

      <div class="navi-content">
        <div v-if="currentView === '推荐'" class="waterfall">
          <HomeCard
              v-for="(card, index) in cards"
              :key="index"
              :imageSrc="card.imageSrc"
              :title="card.title"
              :userAvatar="card.userAvatar"
              :userName="card.userName"
              class="waterfall-item"
              @click="gotoArticle"
          />
          <!--@click="openCardDetail(card)"-->
        </div>

        <div v-if="currentView === '关注'">
          关注用户动态
        </div>

        <CardDetail
            v-if="showDetail"
            :cardData="selectedCard"
            :isVisible="showDetail"
            @close="closeCardDetail"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  user-select: none;
}

.content {
  margin-top: 4vh;
}

.waterfall {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
}

.waterfall-item {
  width: 220px;
  position: absolute;
}

.top-navi {
  margin-bottom: 3vh;
  cursor: pointer;
  user-select: none;
  display: flex;
  gap: 10px;
}

.top-navi span {
  font-size: 1.3em;
  padding: 5px 15px;
  border-radius: 20px;
  transition: background-color 0.3s ease;
}

.active {
  font-weight: bold;
  color: #213547;
  font-family: 'ShangGuB', sans-serif;
  background-color: #f0f0f0;
}

.input-box {
  margin-top: 4vh;
  width: 65vh;
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
}

.search-input {
  padding: 0 60px 0 20px;
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
  padding: 0 20px;
}

.close-icon img,
.search-icon img {
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: transform 0.3s ease;
  padding-left: 10px;
  padding-top: 5px;
}

.close-icon img:hover,
.search-icon img:hover {
  transform: scale(1.1);
}

.navi-content {
  width: 150vh;
}
</style>
