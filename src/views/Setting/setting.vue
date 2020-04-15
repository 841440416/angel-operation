<template>
  <div id="setting">
    <app-head headtitle="我的"></app-head>
    <section>
      <van-cell-group>
        <van-cell
          center
          v-for="(item, index) in list"
          :key="index" 
          is-link
          :to="item.path?item.path:''"
          @click="!item.path && (item.icon === '#clear'?refresh() : switchUser())"
        >
          <!-- 使用 title 插槽来自定义标题 -->
          <template slot="title">
            <svg class="svg-icon">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="item.icon" />
            </svg>
            <span>{{item.text}}</span>
          </template>
        </van-cell>
      </van-cell-group>
      <div class="version">版本号&nbsp;{{appVersion}}</div>
    </section>
    <tabbar></tabbar>
  </div>
</template>
<script>
  export default {
    name: 'setting',
    path: '/setting',
    title: '我的',
    // keepAlive: true,
    routerStatus: 'setting',
    components: {
      AppHead,
      Tabbar
    },
    data() {
      return {
        appVersion: process.env.APP_VERSION, //app版本号
        list: [
          {path: '', icon: '#clear', text: '清理缓存'},
          {path: 'versionList', icon: '#record', text: '版本记录'},
          {path: 'appFeedback', icon: '#app-feedback', text: '产品反馈'},
          {path: '', icon: '#switch', text: '切换账号'},
        ]
      }
    },

    methods: {
      /**
       * 切换账号
       */
      switchUser() {
        this.$dialog.confirm({
          title: '提示',
          message: '确定切换账号？',
          closeOnClickOverlay: true
        }).then(() => {
          this.$router.replace({path: 'login'})
        })
      },

      refresh() {
        location.reload()
      }
    }
  }
</script>

<style scoped lang="scss">
@import "~@/assets/css/public"; 
  #setting {
    @include cell-list;
    .version {
      width: 100%;
      text-align: center;
      position: fixed;
      bottom: 12%;
      color: $content;
    }
  }
</style>
