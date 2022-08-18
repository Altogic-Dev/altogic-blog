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
    },

    createFakeData() {
        for (let index = 0; index < 10; index++) {
            db.model('story').create({
                totalReadingTime: 12,
                user: "62fc93dc622f1396feeff09d",
                username: "buraktest",
                userProfilePicture: "https://play-lh.googleusercontent.com/V_P-I-UENK93ahkQgOWel8X8yFxjhOOfMAZjxXrqp311Gm_RBtlDXHLQhwFZN8n4aIQ",
                likeCount: 6,
                commentCount: 0,
                isPublished: true,
                viewCount: 4,
                readingCount: 8,
                estimatedReadingTime: 6,
                isPrivate: false,
                categoryNames: ["React"],
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod.",
                excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In amet, eu augue integer dui sodales viverra. Sapien dignissim euismod.",
                storyImages: ["https://play-lh.googleusercontent.com/V_P-I-UENK93ahkQgOWel8X8yFxjhOOfMAZjxXrqp311Gm_RBtlDXHLQhwFZN8n4aIQ"],
                title: "Little Title"
            })
            
        }
    }
}

export default StoryService