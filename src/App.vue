<template>
  <navigation-bar />
  <router-view />
</template>

<script lang="ts">
import NavigationBar from "@/components/NavigationBar.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {
    NavigationBar,
  },
  created() {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      this.$store.commit("saveToken", accessToken);
    }
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
