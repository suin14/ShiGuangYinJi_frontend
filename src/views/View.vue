<script setup>
import SideBar from "@/components/SideBar.vue";
</script>

<template>
  <div class="main-body">
    <div class="navi">
      <SideBar />
    </div>
    <div >
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.main-body{
  display: flex;
  flex-direction: row;
  min-height: 90vh;
}
.navi {
  position: fixed;
  left: 0;
  z-index: 1000;
}
</style>
