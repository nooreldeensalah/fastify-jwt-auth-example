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
small {
  display: block;
  font-size: 20px;
  color: red;
  margin-top: 30px;
}
.content {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0em;
  margin: 0em;
}
a:visited {
  color: #2c3e50;
}
.button,
button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5em;
  height: 2em;
  margin: 0.5em;
  border-radius: 5px;
  background: linear-gradient(to right, #16c0b0, #84cf6a);
  font-size: 1em;
  color: white;
  border: none;
  outline: none;
}
form {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 15em;
  margin-bottom: 2em;
}
input {
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 2.6em;
  padding: 0.5em;
  margin-bottom: 1em;
  font: 1em "Avenir", Helvetica, sans-serif;
}
h1 {
  margin-top: 0;
}
</style>
