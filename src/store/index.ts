import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    accessToken: null,
  },
  mutations: {
    storeToken(state, accessToken) {
      state.accessToken = accessToken;
      localStorage.setItem("accessToken", accessToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    },
  },
  actions: {
    register({ commit }, userCredentials) {
      axios
        .post("http://localhost:3000/signup", userCredentials)
        .then((response) => commit("storeToken", response.data.token));
    },
    login({ commit }, userCredentials) {
      axios
        .post("http://localhost:3000/login", userCredentials)
        .then((response) => commit("storeToken", response.data.token));
    },
  },
  modules: {},
});

/* 
Vuex Notes
----------
1) state -> Where we store the data of the app.
2) mutations -> methods that change data in the state
                We can change data by triggering or {{committing a mutation}}.
                (You can't trigger async code here, such as fetching data from an API)
                (You can only trigger synchronous code that will immediately change the data that's in the state)
3) actions -> they can't change data in the state, nor access it
              You can commit mutations within the action
              You can have async code here, such as API calls.
              Triggering actions is called {{dispatching an action}}
4) getters -> Allows us to get data from the state, although we can directly access the state.
5) modules -> Allows us to break the store into multiple modules,
              each separate model having its own mutations, actions, and getters.

 */
