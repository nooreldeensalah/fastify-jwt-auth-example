<template>
  <div class="content">
    <div v-if="!isLoading">
      <h2>Users Table</h2>
      <table id="users">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Username</th>
          <th>Hash</th>
        </tr>
        <tr v-for="user in users" :key="user._id">
          <td>{{ user._id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.passwordHash }}</td>
        </tr>
      </table>
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

<style scoped>
#users {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#users td,
#users th {
  border: 1px solid #ddd;
  padding: 8px;
}

#users tr:nth-child(even) {
  background-color: #f2f2f2;
}

#users tr:hover {
  background-color: #ddd;
}

#users th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04aa6d;
  color: white;
}
</style>
