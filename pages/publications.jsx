import Layout from '@/layouts/Layout';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { publicationActions } from '@/redux/publication/publicationSlice';
import PublicationCard from '@/components/Publications/PublicationCard';

export default function Publications() {
  const publications = useSelector(
    (state) => state.publication.userPublications
  );
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const getPublications = () => {
    dispatch(publicationActions.getUserPublicationsRequest());
  };

  useEffect(() => {
    getPublications();
  }, []);
  return (
    <Layout>
      <div className="h-screen max-w-screen-xl mx-auto px-4 lg:px-8 pb-16">
        <div className="flex flex-col gap-4 mt-8 mb-[80px] md:mt-[60px]">
          <div className="flex flex-col md:flex-row md:items-center justify-between w-full mb-[60px]">
            <h1 className="text-slate-700 mb-8 md:mb-0 text-3xl md:text-4xl xl:text-5xl font-bold tracking-md">
              Publications
            </h1>
            <Link href="/new-pub">
              <a className="flex items-center justify-center w-full md:w-auto px-[18px] py-2.5 text-md font-medium tracking-sm rounded-full text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                New feature page
              </a>
            </Link>
          </div>
        </div>
        <div>
          <h2 className="text-slate-700 mb-12 md:mb-0 text-lg md:text-xl xl:text-2xl tracking-md">
            Staff
          </h2>
          <hr className="my-4" />
          {publications?.map((publication) => (
            <PublicationCard
              key={publication._id}
              publication={publication}
              user={user}
              isStaff
            />
          ))}
        </div>
        <div className="mt-8">
          <h2 className="text-slate-700 mb-12 md:mb-0 text-lg md:text-xl xl:text-2xl tracking-md">
            Following
          </h2>
          <hr className="my-4" />
          {publications?.map((publication) => (
            <PublicationCard
              key={publication._id}
              publication={publication}
              user={user}
              isFollow
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}