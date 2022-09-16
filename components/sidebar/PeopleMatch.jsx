import UserCard from '../general/UserCard';
import SidebarTitle from '../SidebarTitle';

export default function PeopleMatch({ whoFollows, query }) {
  return (
    <div>
      <SidebarTitle title={`People matching ${query}`} />
      <div>
        <ul className="divide-y divide-gray-200">
          {whoFollows?.map((whoFollow) => (
            <UserCard key={whoFollow._id} user={whoFollow} />
          ))}
        </ul>
      </div>
    </div>
  );
}
