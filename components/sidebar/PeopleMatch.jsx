import { useSelector } from 'react-redux';
import UserCard from '../general/UserCard';
import SidebarTitle from '../SidebarTitle';

export default function PeopleMatch({ whoFollows, query }) {
  const userFollowings = useSelector(
    (state) => state.followerConnection.userFollowings
  );
  return (
    <div>
      <SidebarTitle title={`People matching ${query}`} />
      <div>
        <ul className="divide-y divide-gray-200">
          {whoFollows?.map((whoFollow) => (
            <UserCard
              key={whoFollow._id}
              user={whoFollow}
              isFollowing={userFollowings.some(
                (u) => u.followingUser === whoFollow._id
              )}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
