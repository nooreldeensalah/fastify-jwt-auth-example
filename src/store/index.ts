import { createStore } from "vuex";
// TODO: Use Vuex Store for storing authentication status.
export default createStore({
  state: {},
  mutations: {},
  actions: {},
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
