<template>
  <div class="content">
    <img alt="Vue logo" src="../assets/logo.png" />

    <div v-if="!this.$store.state.accessToken">
      <h2>
        To access the dashboard you will need to
        <router-link to="/login">Login</router-link>
        or
        <router-link to="/register">Register</router-link>
      </h2>
    </div>
    <h2 v-else>You can access the dashboard now</h2>
  </div>
</template>

<script lang="ts">
export default {
  name: "Home",
};
</script>
