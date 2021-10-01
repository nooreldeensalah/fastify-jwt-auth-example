<template>
  <div class="content">
    <div v-if="!isLoading">
      <div class="user" v-for="user in users" :key="user.username">
        {{ user }}
      </div>
    </div>
    <h2 v-else-if="!this.$store.state.accessToken">
      You must be authenticated in order to access the dashboard
    </h2>
    <h2 v-else>Loading...</h2>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      isLoading: true,
      users: [],
    };
  },
  created() {
    return axios
      .get("http://localhost:3000/users")
      .then((response) => {
        this.users = response.data;
        this.isLoading = false;
      })
      .catch((error) => console.log(error));
  },
};
</script>
