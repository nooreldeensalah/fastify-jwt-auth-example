<template>
  <div class="content">
    <img alt="Vue logo" src="../assets/logo.png" />

    <div v-if="!this.$store.state.accessToken">
      To access the dashboard you will need to
      <router-link to="/login">Login</router-link>
      or
      <router-link to="/register">Register</router-link>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Home",
};
</script>
