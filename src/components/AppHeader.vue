<template>
  <div id="app-head" class="bgc" v-if="!this.$store.state.isDd">
    <div class="head flex-row">
      <van-icon name="arrow-left" v-if="isBack" @click="$router.go(-1)" />
      <van-icon name="arrow-left" v-if="isControl" @click="controlLeft" />
      <span>{{headtitle}}</span>
      <van-icon :name="openIcon" v-if="isOpen && openIcon" @click="clickIcon(openIcon)" ref="menu" />
      <span @click="clickName(openName)" v-if="isOpen && openName" class="openName">{{openName}}</span>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch, Provide } from "vue-property-decorator";
@Component({
  // 组件注册
  components: {},
  // 过滤器
  filters: {},
  // 属性传递
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  }
})
export default class AppHeader extends Vue {
  @Prop({ default: false }) private isOpen!: boolean;
  @Prop({ default: false }) private isBack!: boolean;
  @Prop({ default: false }) private isControl!: boolean;
  @Prop() private headtitle!: string;
  @Prop() private openIcon!: string;
  @Prop() private openName!: string;

  /**
   * @desc 点击icon
   * @param {String} openIcon icon值
   */
  private clickIcon(openIcon: string): void {
    this.$emit("open", openIcon);
  }

  /**
   * @desc 点击姓名
   * @param {String} openName 姓名
   */
  private clickName(openName: string): void {
    this.$emit("open", openName);
  }
  /**
   * @desc 控制导航栏左侧点击事件
   */
  private controlLeft(): void {
    this.$emit("isControl", false);
  }
}
</script>
<style scoped lang="scss">
@import "~@/assets/css/mixin";
#app-head {
  @include wh(92%, 2.2rem);
  padding: 0 4%;
  position: fixed;
  top: 0;
  z-index: 666;
  .head {
    height: 100%;
    color: #fff;
    justify-content: center;
    position: relative;
    .van-icon {
      @include wh(1rem, 1rem);
      position: absolute;
      font-size: 1.2rem;
      line-height: 1rem;
      left: 0;
      &:last-child {
        left: auto;
        right: 0;
      }
    }
    .openName {
      position: absolute;
      right: 0;
    }
  }
}
</style>
