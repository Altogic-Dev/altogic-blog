import WhoToFollow from '@/components/sidebar/WhoToFollow';
import StoriesYouFollow from '@/components/sidebar/StoriesYouFollow';
import PopularTopics from '@/components/sidebar/PopularTopics';
import PopularStories from '@/components/sidebar/PopularStories';
import MobilePopularStories from '@/components/sidebar/MobilePopularStories';
import Followings from '@/components/sidebar/Following';
import TopicMatch from '@/components/sidebar/TopicMatch';
import Profile from '@/components/sidebar/Profile';
import PublicationProfile from '@/components/sidebar/PublicationProfile';
import Footer from './Footer';
import PersonalFullStatistic from '@/components/sidebar/PersonalFullStatistic';
import PeopleMatch from '@/components/sidebar/PeopleMatch';

export default function Sidebar({
  personalFullStatistic,
  topicMatch,
  peopleMatch,
  whoTheFollow,
  storiesYouFollow,
  popularTopics,
  popularStories,
  mobilePopularStories,
  profile,
  following,
  relatedTopics,
  followButton,
  editButton,
  publicationProfile,
}) {
  return (
    <>
      <form action="" className="hidden lg:block">
        <div>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.5 17.5L14.5834 14.5833M16.6667 9.58333C16.6667 13.4954 13.4954 16.6667 9.58333 16.6667C5.67132 16.6667 2.5 13.4954 2.5 9.58333C2.5 5.67132 5.67132 2.5 9.58333 2.5C13.4954 2.5 16.6667 5.67132 16.6667 9.58333Z"
                  stroke="currentColor"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <input
              type="email"
              name="email"
              id="email"
              className="focus:ring-purple-500 focus:border-purple-500 block w-full h-11 pl-10 sm:text-sm text-gray-500 border-gray-300 rounded-md placeholder:text-gray-500"
              placeholder="Search"
            />
          </div>
        </div>
      </form>
      {publicationProfile && <PublicationProfile />}

      {topicMatch && <TopicMatch />}
      {profile && (
        <Profile followButton={followButton} editButton={editButton} />
      )}
      {following && <Followings />}
      {mobilePopularStories && <MobilePopularStories />}
      {storiesYouFollow && <StoriesYouFollow />}
      {whoTheFollow && <WhoToFollow />}
      {popularTopics && <PopularTopics />}
      {popularStories && <PopularStories />}

      {peopleMatch && <PeopleMatch />}

      {personalFullStatistic && <PersonalFullStatistic />}
      <Footer />
    </>
  );
}
