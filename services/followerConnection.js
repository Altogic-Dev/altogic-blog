import { db } from "@/utils/altogic"

const FollowerConnectionService = {
    getFollowingStories(userId) {
        return db
        .model('follower_connection')
        .filter(`followerUser == '${userId}'`)
        .lookup({ field: 'followingUser' })
        // .lookup({ field: "stories" })
        .limit(50)
        // .sort('createdAt', 'desc')
        .get()
    }
}

export default FollowerConnectionService