import { createStore } from "vuex";
import { auth } from "./auth.module";
import { posts } from "./post.module";
import { comments } from "./comment.module";

const store = createStore({
  modules: {
    auth,
    posts,
    comments
  },
});

export default store;
