<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/dashboard">Dashboard</router-link> |
    <router-link
      v-if="!this.$store.state.accessToken"
      to="/login"
      class="button"
      >Login</router-link
    >
    <button v-else @click="logout">Logout</button>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style scoped>
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
