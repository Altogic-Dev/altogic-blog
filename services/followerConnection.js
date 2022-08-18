import { db } from "@/utils/altogic"

const FollowerConnectionService = {
    unfollow(userId, followingUserId) {
        return db
        .model('follower_connection')
        .filter(`followerUser == '${userId}' && followingUser == '${followingUserId}'`)
        .delete()
    }
}

export default FollowerConnectionService