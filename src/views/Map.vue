<!--<script setup>-->
<!--import * as echarts from "echarts";-->
<!--import { onMounted } from "vue";-->
<!--import chinaGeoJson from "@/assets/china.json"; // 确保 `china.json` 文件存在并正确导入-->

<!--onMounted(() => {-->
<!--  const chartDom = document.getElementById("map");-->

<!--  if (chartDom) {-->
<!--    const myChart = echarts.init(chartDom);-->

<!--    // 注册地图-->
<!--    echarts.registerMap("china", chinaGeoJson);-->

<!--    const option = {-->
<!--      backgroundColor: "#000",-->
<!--      tooltip: {-->
<!--        trigger: "item",-->
<!--        formatter: "{b}",-->
<!--      },-->
<!--      visualMap: {-->
<!--        show: false,-->
<!--        min: 0,-->
<!--        max: 1000,-->
<!--        inRange: {-->
<!--          color: ["#0f0c29", "#302b63", "#24243e"],-->
<!--        },-->
<!--      },-->
<!--      series: [-->
<!--        {-->
<!--          type: "map",-->
<!--          map: "china",-->
<!--          roam: true,-->
<!--          label: {-->
<!--            show: true,-->
<!--            color: "#fff",-->
<!--          },-->
<!--          itemStyle: {-->
<!--            areaColor: "#3a3a3a",-->
<!--            borderColor: "#6ea3ff",-->
<!--          },-->
<!--          emphasis: {-->
<!--            itemStyle: {-->
<!--              areaColor: "#ffcc33",-->
<!--            },-->
<!--          },-->
<!--        },-->
<!--      ],-->
<!--    };-->

<!--    myChart.setOption(option);-->

<!--    // 监听窗口大小调整事件-->
<!--    window.addEventListener("resize", () => {-->
<!--      myChart.resize();-->
<!--    });-->
<!--  }-->
<!--});-->
<!--</script>-->

<!--<template>-->
<!--  <div class="map-body">-->
<!--    <div id="map" class="map-container"></div>-->
<!--  </div>-->
<!--</template>-->

<!--<style scoped>-->
<!--.map-body {-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--  align-items: center;-->
<!--  background-color: black;-->
<!--  height: 100vh;-->
<!--  margin: 0;-->
<!--}-->

<!--.map-container {-->
<!--  width: 90%;-->
<!--  height: 90%;-->
<!--}-->
<!--</style>-->
