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

  </div>

</template>

<style scoped>
.article-list-container {
  height: 70vh;
  overflow-y: auto;
  width: 100%;
}

/* 美化滚动条 */
.article-list-container::-webkit-scrollbar {
  width: 10px;
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
