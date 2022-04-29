import { createStore } from "vuex";
import { auth } from "./auth.module";
import { posts } from "./posts.module";

const store = createStore({
  modules: {
    auth,
    posts
  },
});

export default store;
