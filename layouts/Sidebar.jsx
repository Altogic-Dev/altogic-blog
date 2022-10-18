import WhoToFollow from '@/components/sidebar/WhoToFollow';
import StoriesYouFollow from '@/components/sidebar/StoriesYouFollow';
import PopularTopics from '@/components/sidebar/PopularTopics';
import PopularStories from '@/components/sidebar/PopularStories';
import MobilePopularStories from '@/components/sidebar/MobilePopularStories';
import Following from '@/components/sidebar/Following';
import TopicMatch from '@/components/sidebar/TopicMatch';
import Profile from '@/components/sidebar/Profile';
import PublicationProfile from '@/components/sidebar/PublicationProfile';
import PersonalFullStatistic from '@/components/sidebar/PersonalFullStatistic';
import PeopleMatch from '@/components/sidebar/PeopleMatch';
import PublicationMatch from '@/components/sidebar/PublicationMatch';
import Footer from './Footer';

export default function Sidebar({
  personalFullStatistic,
  topicMatch,
  peopleMatch,
  whoToFollow,
  topWriters,
  topicWriters,
  storiesYouFollow,
  popularTopics,
  popularStories,
  mobilePopularStories,
  profile,
  following,
  relatedTopics,
  publicationProfile,
  isFollowing,
  isSubscribed,
  Tag,
  topics,
  peoples,
  query,
  stories,
  publications,
  publicationsMatch,
  followLoading,
  followingStoriesPage,
  followingTopics,
  userTopics,
}) {
  return (
    <>
      {personalFullStatistic && <PersonalFullStatistic />}
      {publicationProfile && <PublicationProfile />}
      {topicMatch && <TopicMatch topics={topics} query={query} />}
      {profile && (
        <Profile
          profile={profile}
          isFollowing={isFollowing}
          isSubscribed={isSubscribed}
          isLoading={followLoading}
        />
      )}
      {following && (
        <Following
          followings={following?.followings}
          count={following?.count}
          seeAllButton={following?.seeAllButton}
        />
      )}
      {mobilePopularStories && <MobilePopularStories />}
      {storiesYouFollow && (
        <StoriesYouFollow
          storiesYouFollow={storiesYouFollow}
          page={followingStoriesPage}
        />
      )}
      {(whoToFollow || topWriters || topicWriters) && (
        <WhoToFollow
          topicWriters={topicWriters}
          whoToFollow={whoToFollow}
          topWriters={topWriters}
          Tag={Tag}
        />
      )}
      {(popularTopics || relatedTopics || followingTopics || userTopics) && (
        <PopularTopics
          isFollowingTopics={followingTopics}
          isPopularTopics={popularTopics}
          isRelatedTopics={relatedTopics}
          userTopics={profile?.topWriterTopics}
        />
      )}
      {popularStories && stories?.length > 0 && (
        <PopularStories
          title={query ? `Stories Match ${query}` : 'Popular Stories'}
          stories={stories}
        />
      )}

      {peopleMatch && <PeopleMatch whoFollows={peoples} query={query} />}
      {publicationsMatch && (
        <PublicationMatch publications={publications} query={query} />
      )}

      <Footer />
    </>
  );
}
