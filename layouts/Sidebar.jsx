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
import Footer from './Footer';

export default function Sidebar({
  getFollowingRequest,
  personalFullStatistic,
  topicMatch,
  peopleMatch,
  whoToFollow,
  topWriters,
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
      {storiesYouFollow && <StoriesYouFollow />}
      {(whoToFollow || topWriters) && (
        <WhoToFollow isTopWriters={topWriters} Tag={Tag} />
      )}
      {(popularTopics || relatedTopics) && (
        <PopularTopics isRelatedTopics={relatedTopics} />
      )}
      {popularStories && (
        <PopularStories
          title={query ? `Stories Match ${query}` : 'Popular Stories'}
          stories={stories}
        />
      )}

      {peopleMatch && <PeopleMatch whoFollows={peoples} query={query} />}

      <Footer />
    </>
  );
}
