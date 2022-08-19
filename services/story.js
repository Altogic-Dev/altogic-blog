import { db } from "@/utils/altogic"

const StoryService = {
    getFollowingStories(userId, page = 1, limit = 10) {
        return db
        .model('story')
        .lookup({ 
            modelName: 'follower_connection', 
            name: 'followerConnection', 
            query: `this.user == lookup.followingUser && lookup.followerUser == '${userId}'`
        })
        .filter('exists(followerConnection) && !this.isDeleted && this.isPublished && !this.isPrivate')
        .sort("createdAt", "desc")
        .limit(limit)
        .page(page)
        .get(true)
    }
}

export default StoryService