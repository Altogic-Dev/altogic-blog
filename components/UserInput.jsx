import _ from 'lodash';
import Category from './Category';

export default function UserInput({
  label,
  users,
  setUsers,
  maxUsers,
  onChange,
  value,
  ...inputProps
}) {
  const handleDelete = (userId) => {
    const newUsers = _.reject(users, ({ _id }) => _id === userId);
    setUsers(newUsers);
  };

  return (
    <div className="relative mb-4 md:mb-6">
      {label && (
        <span className="inline-flex text-slate-600 mb-4 text-sm tracking-sm">
          {label}:
        </span>
      )}
      <div className="flex flex-wrap items-center gap-2 py-1 mb-8 rounded-md">
        <input
          className="justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white sm:text-sm font-medium text-slate-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          onChange={onChange}
          value={value}
          {...inputProps}
        />

        {_.map(users, (user) => (
          <Category
            key={user._id}
            tag={user.name}
            onClick={() => handleDelete(user._id)}
            className="mt-2 text-xs"
          />
        ))}
      </div>
    </div>
  );
}
