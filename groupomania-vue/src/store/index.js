import { createStore } from "vuex";
import { auth } from "./auth.module";
import { posts } from "./post.module";
import { users } from "./user.module";
import { comments } from "./comment.module";

const store = createStore({
  modules: {
    auth,
    users,
    posts,
    comments
  },
});

export default store;
