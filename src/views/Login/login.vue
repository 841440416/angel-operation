<template>
  <div id="login">
    <div class="logo_01">
      <img src="../../assets/images/logo_01.png" />
    </div>
    <div class="logo_02">
      <img src="../../assets/images/logo_02.png" />
    </div>
    <section>
      <form action>
        <div class="login_account">
          <van-icon name="manager" color="#aaa" size="1rem" />
          <input
            type="text"
            @input="blur('userName', 'input')"
            v-model="value.userName"
            placeholder="请输入登录账号"
            maxlength="20"
            autocomplete="off"
            @keyup="value.userName=value.userName.replace(/(^\s*)|(\s*$)/g, '')"
            @keyup.enter="submit"
          />
        </div>
        <div class="login_pwd">
          <van-icon name="lock" color="#aaa" size="1rem" />
          <input
            type="password"
            @input="blur('password', 'input')"
            v-model="value.password"
            placeholder="请输入登录密码"
            maxlength="20"
            autocomplete="off"
            @keyup="value.password=value.password.replace(/(^\s*)|(\s*$)/g, '')"
            @keyup.enter="submit"
            ref="pwd"
          />
          <van-icon :name="icon_eye" size=".8rem" @click.native="onOpen" />
        </div>
      </form>
      <van-button type="info" :disabled="!this.canSubmit" @click="submit">登录</van-button>
    </section>
  </div>
</template>

<script>
import { _toast } from "@/utils/plugin";

export default {
  name: "login",
  path: "/login",
  title: "用户登录",
  // keepAlive: true,
  routerStatus: "login",
  data() {
    return {
      isOk: {
        userName: false,
        password: false
      },
      value: {
        userName: "",
        password: ""
      },
      icon_eye: "closed-eye"
    };
  },

  computed: {
    canSubmit() {
      return this.isOk.userName && this.isOk.password;
    }
  },

  created() {
    let userName = window.system.getCookie("userName");
    if (userName) {
      this.value.userName = userName;
      this.isOk.userName = true;
    }
  },

  mounted() {
    // 防止安卓手机输入框被虚拟键盘遮挡
    if (/Android/.test(navigator.userAgent)) {
      window.addEventListener("resize", () => {
        if (
          document.activeElement.tagName == "INPUT" ||
          document.activeElement.tagName == "TEXTAREA"
        ) {
          window.setTimeout(function() {
            document.activeElement.scrollIntoViewIfNeeded();
          }, 10);
        }
      });
    }
  },

  methods: {
    blur(type, event) {
      let val = this.value;
      if (val[type].replace(/(^\s*)|(\s*$)/g, "").length > 0) {
        this.isOk[type] = true;
      } else {
        this.isOk[type] = false;
      }
    },

    onOpen() {
      if (this.$refs.pwd.type === "password") {
        this.$refs.pwd.type = "text";
        this.icon_eye = "eye-o";
      } else {
        this.$refs.pwd.type = "password";
        this.icon_eye = "closed-eye";
      }
    },

    async submit() {
      if (!this.canSubmit) {
        return;
      }
      const params = {
        username: this.value.userName,
        password: this.value.password
      };
      const { data } = await this.$http.associateUser(params);
      this.loginHandler(data.data);
    },

    /**
     * @desc 用户认证成功回调
     * @param {Object} obj reponse params
     */
    loginHandler(obj) {
      let _this = this;
      window.system.setCookie("userName", _this.value.userName); // 缓存账号
      localStorage.setItem("userName", obj.name); // 缓存用户信息
      _this.$store.commit("set_user_id", obj.id);
      _this.$router.replace({ name: "home" });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/mixin";
$color: #cacaca;
#login {
  height: calc(100% + 2.2rem);
  margin-top: -2.2rem;
  text-align: center;
  background: #a0c8e8;
  overflow: hidden;
  .logo_01 {
    margin-top: 25%;
    img {
      width: 50%;
    }
  }
  .logo_02 {
    margin-top: 2rem;
    img {
      @include wh(6.3rem, 6.3rem);
    }
  }
  section {
    margin-top: 1rem;
    .login_account,
    .login_pwd {
      height: 2.5rem;
      background: #fff;
      padding: 0 1rem;
      @include fj();
      > .icon {
        @include wh(1.4rem, 1.4rem);
      }
    }
    .login_account {
      border-bottom: 1px solid $border;
      padding: 0 1.8rem 0 1rem;
    }
    input {
      @include wh(100%, 1.5rem);
      line-height: 1.5rem;
      text-align: center;
      -webkit-appearance: none;
      -moz-appearance: none;
    }
    button {
      @include wh(90%, 2rem);
      margin: 1.5rem 0;
    }
  }
}
</style>
