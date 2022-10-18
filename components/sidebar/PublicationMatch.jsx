import React from 'react';
import PublicationCard from '../Publications/PublicationCard';
import SidebarTitle from '../SidebarTitle';

export default function PublicationMatch({ publications, query }) {
  return (
    <div>
      <SidebarTitle title={`Publication matching ${query}`} />
      <div>
        <ul className="divide-y divide-gray-200">
          {publications.length > 0 ? (
            publications?.map((publication) => (
              <PublicationCard
                key={publication._id}
                publication={publication}
              />
            ))
          ) : (
            <div className="text-left text-gray-500">No publications found</div>
          )}
        </ul>
      </div>
    </div>
  );
}
