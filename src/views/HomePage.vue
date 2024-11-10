<script setup>
import {ref, onMounted, onUpdated, nextTick, onBeforeUnmount} from 'vue';
import HomeCard from "@/components/HomeCard.vue";
import vueImage from '@/assets/test1.png';
import testImage from '@/assets/icon/avatar.jpg';
import avatarImage from '@/assets/icon/avatar.jpg';

const searchInput = ref('');
const currentView = ref('推荐');

const cards = ref([
  {
    imageSrc: vueImage,
    title: '欢迎来到主页',
    userAvatar: avatarImage,
    userName: 'Momo'
  },
  {
    imageSrc: testImage,
    title: '开发者社区',
    userAvatar: avatarImage,
    userName: '张三'
  },
  {
    imageSrc: vueImage,
    title: 'Vue 3 教程',
    userAvatar: avatarImage,
    userName: '李四'
  },
  {
    imageSrc: testImage,
    title: 'JavaScript 学习',
    userAvatar: avatarImage,
    userName: '王五'
  },
  {
    imageSrc: vueImage,
    title: '欢迎来到主页',
    userAvatar: avatarImage,
    userName: 'Momo'
  },
  {
    imageSrc: testImage,
    title: '开发者社区',
    userAvatar: avatarImage,
    userName: '张三'
  },
  {
    imageSrc: vueImage,
    title: 'Vue 3 教程',
    userAvatar: avatarImage,
    userName: '李四'
  },
  {
    imageSrc: testImage,
    title: 'JavaScript 学习',
    userAvatar: avatarImage,
    userName: '王五'
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
    const cards = document.querySelectorAll('.waterfall-item');
    const container = document.querySelector('.waterfall');
    const columnCount = Math.floor(container.offsetWidth / 250);
    const columns = Array(columnCount).fill(0);

    cards.forEach(card => {
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
  window.addEventListener('resize', setCardHeights);
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
</script>

<template>
  <div class="main-page">
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
          />
        </div>

        <div v-if="currentView === '关注'">
          关注用户动态
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
