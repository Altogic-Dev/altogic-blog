import React from 'react';
import PublicationCard from '../PublicationCard';
import SidebarTitle from '../SidebarTitle';

export default function PublicationMatch({ publications, query }) {
  return (
    <div>
      <SidebarTitle title={`People matching ${query}`} />
      <div>
        <ul className="divide-y divide-gray-200">
          {publications?.map((publication) => (
            <PublicationCard key={publication._id} publication={publication} />
          ))}
        </ul>
      </div>
    </div>
  );
}
