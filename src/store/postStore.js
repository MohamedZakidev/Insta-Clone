import { create } from "zustand";

const usePostStore = create((set) => ({
    posts: [],
    createPost: (post) => set(state => ({ posts: [post, ...state.posts] })),
    setPosts: (posts) => set({ posts })
    //delete post
    //add comment
    //set post
}))

export default usePostStore