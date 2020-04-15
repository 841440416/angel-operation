<template>
  <div class="home-page">
    <AppHeader :headtitle="headtitle" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Route } from "vue-router";
@Component({
  components: {}
})
export default class Home extends Vue {
  private headtitle: string = "常规物料";
  public created() {
    // this.$store.dispatch('initHomePage');
  }
}
</script>