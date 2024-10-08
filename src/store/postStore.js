import { create } from "zustand";

const usePostStore = create((set) => ({
    posts: [],
    createPost: (post) => set(state => ({ posts: [post, ...state.posts] })),
    setPosts: (posts) => set({ posts }),
    deletePost: (id) => set(state => ({ posts: state.posts.filter(post => post.id !== id) })),
    addComment: (postId, newComment) => set(state => ({
        posts:
            state.posts.map(post => {
                return post.id === postId ?
                    {
                        ...post,
                        comments: [...post.comments, newComment]
                    } :
                    post
            })
    })),
    addLike: (postId, userUid) => set(state => ({
        posts:
            state.posts.map(post => {
                return post.id === postId ?
                    {
                        ...post,
                        likes: [...post.likes, userUid]
                    } :
                    post
            })
    })),
    removeLike: (postId, userUid) => set(state => ({
        posts:
            state.posts.map(post => {
                return post.id === postId ?
                    {
                        ...post,
                        likes: post.likes.filter(uid => uid !== userUid)
                    } :
                    post
            })
    })),
    //set post
}))

export default usePostStore