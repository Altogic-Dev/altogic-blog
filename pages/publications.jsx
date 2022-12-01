import Layout from '@/layouts/Layout';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { publicationActions } from '@/redux/publication/publicationSlice';
import PublicationCard from '@/components/Publications/PublicationCard';
import _ from 'lodash';
import { EmotionUnhappy } from '@icon-park/react';

export default function Publications() {
  const publications = useSelector(
    (state) => state.publication.userPublications
  );
  const followedPublications = useSelector(
    (state) => state.publication.followed_publications
  );
  const userFollowingPublication = useSelector(
    (state) => state.publication.userFollowingPublication
  );

  const user = useSelector((state) => state.auth.user);
  const [publicationsFollow, setPublicationsFollow] = useState([]);
  const dispatch = useDispatch();
  const getPublications = () => {
    dispatch(publicationActions.getUserPublicationsRequest());
  };

  useEffect(() => {
    getPublications();
  }, []);
  useEffect(() => {
    if (followedPublications) {
      setPublicationsFollow(
        followedPublications.map((publication) => ({
          _id: publication.publication,
          name: publication.publicationName,
          description: publication.publicationDescription,
          logo: publication.publicationLogo,
          isFollowing: userFollowingPublication.some(
            (publicationFollowing) =>
              publicationFollowing === publication.publication
          ),
        }))
      );
    }
  }, [followedPublications, userFollowingPublication]);

  return (
    <Layout loading={!publications}>
      <div className="h-screen max-w-screen-xl mx-auto px-4 lg:px-8 pb-16">
        <div className="flex flex-col gap-4 mt-8 mb-[80px] md:mt-[60px]">
          <div className="flex flex-col md:flex-row md:items-center justify-between w-full mb-[60px]">
            <h1 className="text-slate-700 mb-8 md:mb-0 text-3xl md:text-4xl xl:text-5xl font-bold tracking-md">
              Publications
            </h1>
            <Link href="/publication/new-publication">
              <a className="flex items-center justify-center w-full md:w-auto px-[18px] py-2.5 text-md font-medium tracking-sm rounded-full text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                New Publication
              </a>
            </Link>
          </div>
        </div>
        <div>
          <h2 className="text-slate-700 mb-12 md:mb-0 text-lg md:text-xl xl:text-2xl tracking-md">
            Staff
          </h2>
          <hr className="my-4" />
          {_.size(publications) > 0 ? (
            publications?.map((publication) => (
              <PublicationCard
                key={publication._id}
                publication={publication}
                user={user}
                isStaff
              />
            ))
          ) : (
            <div className="flex justify-center items-center flex-col">
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-purple-100 mb-6 ring-8 ring-purple-50">
                <EmotionUnhappy size={28} className="w-7 h-7 text-purple-600" />
              </span>
              <p className="text-slate-500 text-md  ">
                You are not member of any publication
              </p>
            </div>
          )}
        </div>
        <div className="mt-8">
          <h2 className="text-slate-700 mb-12 md:mb-0 text-lg md:text-xl xl:text-2xl tracking-md">
            Following
          </h2>
          <hr className="my-4" />
          {_.size(publicationsFollow) > 0 ? (
            publicationsFollow?.map((publication) => (
              <PublicationCard
                key={publication._id}
                publication={publication}
                user={user}
                isFollow
              />
            ))
          ) : (
            <div className="flex justify-center items-center flex-col">
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-purple-100 mb-6 ring-8 ring-purple-50">
                <EmotionUnhappy size={28} className="w-7 h-7 text-purple-600" />
              </span>
              <p className="text-slate-500 text-md  ">
                You are not following any publication
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
