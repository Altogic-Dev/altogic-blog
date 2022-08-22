import { db } from "@/utils/altogic"

const ReportService = {
    reportStory(userId, storyId, reportedUserId) {
        return db
        .model('report')
        .create({
            reportedStory: storyId,
            reportedUser: reportedUserId,
            user: userId
        })
    }
}

export default ReportService