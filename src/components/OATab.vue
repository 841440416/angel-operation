<template>
  <van-tabs v-model="active" color="#26a2ff" title-active-color="#26a2ff" swipeable sticky>
    <van-tab v-for="item in tabs" :title="item.name" :key="item.key">
      <van-panel title="标题" desc="描述信息" status="状态"></van-panel>
    </van-tab>
  </van-tabs>
</template>

<script>
export default {
  name: "oa-tab",
  props: {
    tabs: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      active: 0,
    }
  }
};
</script>

<style scoped lang="scss">
</style>