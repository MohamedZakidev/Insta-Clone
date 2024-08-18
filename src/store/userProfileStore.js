import { create } from "zustand"

const userProfileStore = create((set) => ({
    userProfile: null,
    setUserProfile: (userProfile) => set({ userProfile })
    //add post
}))

export default userProfileStore