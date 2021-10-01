<template>
  <h2>Dashboard</h2>
  <div v-if="!isLoading">
    <div class="user" v-for="user in users" :key="user.username">
      {{ user }}
    </div>
  </div>
  <h2 v-else>Loading...</h2>
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

<style></style>
