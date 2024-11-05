<script setup>
import ArticleListSlot from "@/components/ArticleListSlot.vue";
</script>

<template>
  <div class="article-list-container">
    <ArticleListSlot />
    <ArticleListSlot />
    <ArticleListSlot />
    <ArticleListSlot />
    <ArticleListSlot />
    <ArticleListSlot />
    <ArticleListSlot />
    <ArticleListSlot />
    <ArticleListSlot />
    <ArticleListSlot />
    <ArticleListSlot />
    <ArticleListSlot />
    <ArticleListSlot />
    <ArticleListSlot />
    <ArticleListSlot />
    <ArticleListSlot />
    <ArticleListSlot />
    <ArticleListSlot />
    <ArticleListSlot />
    <ArticleListSlot />
    <ArticleListSlot />
    <ArticleListSlot />
    <ArticleListSlot />
    <ArticleListSlot />
    <ArticleListSlot />
    <ArticleListSlot />
    <ArticleListSlot />
    <ArticleListSlot />
    <ArticleListSlot />
    <ArticleListSlot />
    <ArticleListSlot />
    <ArticleListSlot />
    <ArticleListSlot />
  </div>
</template>

<style scoped>
.article-list-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 70vh;
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%; /* 占满容器宽度 */
}

.article-list-container > * {
  flex-shrink: 0;
  width: 250px;
  margin-right: 10px;
  margin-bottom: 10px;
}

/* 美化滚动条 */
.article-list-container::-webkit-scrollbar {
  width: 10px; /* 改为垂直滚动条的宽度 */
}

.article-list-container::-webkit-scrollbar-thumb {
  background: white;
  border-radius: 10px;
}

.article-list-container::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
</style>
