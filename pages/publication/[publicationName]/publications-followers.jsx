import React, { useState, useEffect } from 'react';
import HeadContent from '@/components/general/HeadContent';
import { Tab } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { publicationActions } from '@/redux/publication/publicationSlice';
import Layout from '@/layouts/Layout';
import { classNames } from '@/utils/utils';
import _ from 'lodash';

export default function PublicationsFollowers() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dispatch = useDispatch();
  const peoples = useSelector(
    (state) => state.publication.publicationFollowers
  );
  const publication = useSelector(
    (state) => state.publication.selectedPublication
  );
  const isLoading = useSelector((state) => state.publication.isLoading);

  const getFollowers = () => {
    dispatch(
      publicationActions.getPublicationFollowersRequest(publication._id)
    );
  };

  useEffect(() => {
    if (publication) getFollowers();
  }, [publication]);

  return (
    <div>
      <HeadContent>
        <title>Opinate Publications Followers</title>
        <meta name="description" content="Opinate Publications Followers" />
      </HeadContent>
      <Layout loading={isLoading}>
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8 pb-16">
          {_.get(publication, 'name') && (
            <>
              <h1 className="text-slate-700 my-[60px] text-5xl font-bold tracking-md">
                {`${_.get(publication, 'name')} followers`}
              </h1>
              <div className="mx-auto">
                <Tab.Group
                  selectedIndex={selectedIndex}
                  onChange={setSelectedIndex}
                >
                  <Tab.List className="flex items-center gap-10 h-11 border-b border-gray-300 mb-[60px]">
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          'inline-flex gap-2 h-full text-sm font-medium tracking-sm px-2 focus:outline-none',
                          selected
                            ? 'text-purple-700 relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-purple-700'
                            : 'text-slate-500'
                        )
                      }
                    >
                      Followers
                      <span
                        className={classNames(
                          'inline-flex bg-slate-50 text-slate-500 px-2.5 py-0.5 rounded-full',
                          selectedIndex === 0
                            ? 'bg-purple-50 text-purple-900'
                            : ''
                        )}
                      >
                        {peoples.length}
                      </span>
                    </Tab>
                  </Tab.List>
                  <Tab.Panels>
                    <Tab.Panel className="divide-y divide-gray-200">
                      <ul className="divide-y divide-gray-200">
                        {peoples.map((people) => (
                          <li
                            key={people.id}
                            className="flex items-center justify-between gap-3 py-4"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                className="w-16 h-16 rounded-full"
                                src={people?.userProfilePicture}
                                alt={people?.user?.name}
                              />
                              <div className="flex flex-col">
                                <span className="text-slate-700 mb-1 text-md font-medium tracking-sm">
                                  {people?.user?.name}
                                </span>
                                <span
                                  className="text-slate-500 text-xs tracking-sm"
                                  dangerouslySetInnerHTML={{
                                    __html: people?.userAbout,
                                  }}
                                />
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </div>
            </>
          )}
        </div>
      </Layout>
    </div>
  );
}
