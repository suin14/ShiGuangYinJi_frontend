<script setup>
import {ref, onMounted, onUpdated, nextTick, onBeforeUnmount} from 'vue';
import HomeCard from "@/components/HomeCard.vue";
import CardDetail from "@/components/CardDetail.vue";
import vueImage from '@/assets/vue.svg';
import testImage from "@/assets/test.jpg";
import avatarImage from '@/assets/avatar.png';
import router from "@/router/index.js";
import {GetRandomDocuments, GetUserById, SearchDocuments} from "@/api/api.js";

const searchInput = ref('');
const currentView = ref('推荐');

const cards = ref([
]);


const topics= ref();

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

async function fetchDocs() {
  try {
    const response = await GetRandomDocuments(10);
    console.log("获取的文档:", response);

    if (response && response.success && Array.isArray(response.data)) {
      // 并发请求所有用户信息
      const docs = response.data;
      const userRequests = docs.map(doc => GetUserById(doc.owner_id));
      const userResponses = await Promise.all(userRequests);

      // 组合文档和用户数据
      cards.value = docs.map((doc, index) => {
        const user = userResponses[index];
        return {
          docId: doc.id,
          title: doc.title,
          userAvatar: user?.avatar_url || avatarImage, // 默认头像
          userName: user?.nickname || '未知用户',
          content: doc.content,
        };
      });
    } else {
      console.error("返回数据格式不符合预期:", response);
    }
  } catch (error) {
    console.error("文档获取出错:", error);
  }
}

// 页面加载后调整瀑布流布局
onMounted(async () => {
  try {
    await fetchDocs();

    setCardHeights();
  } catch (error) {
    console.error("加载推荐文档失败:", error);
  }
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

const gotoArticle = (docId) => {
  console.log(docId)
  router.push({
    name: '文章页面',
    query: {
      id: docId
    }
  });
}

async function handleSearch(keyword) {
  try {
    const result = await SearchDocuments(keyword);
    console.log("搜索结果：", result);


    if (result && result.success && Array.isArray(result.data)) {
      // 并发请求所有用户信息
      const docs = result.data;
      const userRequests = docs.map(doc => GetUserById(doc.owner_id));
      const userResponses = await Promise.all(userRequests);

      // 组合文档和用户数据
      cards.value = docs.map((doc, index) => {
        const user = userResponses[index];
        return {
          docId: doc.id,
          title: doc.title,
          userAvatar: user?.avatar_url || avatarImage, // 默认头像
          userName: user?.nickname || '未知用户',
          content: doc.content,
        };
      });
    } else {
      console.error("返回数据格式不符合预期:", result);
    }
  } catch (error) {
    console.error("搜索失败：", error);
  }
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
          @keyup.enter="handleSearch(searchInput)"
      />
      <div class="input-button">
        <div class="close-icon" v-if="searchInput" @click="clearInput">
          <img src="@/assets/icon/close.svg" alt="关闭" />
        </div>
        <div class="search-icon">
          <img src="@/assets/icon/search.svg" alt="搜索" @click="handleSearch(searchInput)"/>
        </div>
      </div>
    </div>

    <div class="content">
      <div class="top-navi">
        <span @click="switchView('推荐')" :class="{ active: currentView === '推荐' }">推荐
          <img src="@/assets/icon/refresh-cw.svg" alt="搜索" style="scale: 90%" @click="fetchDocs"></span>
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
              :title="card.title"
              :userAvatar="card.userAvatar"
              :userName="card.userName"
              class="waterfall-item"
              @click="gotoArticle(card.docId)"
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
