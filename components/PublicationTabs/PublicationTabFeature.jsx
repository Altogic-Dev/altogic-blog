import _ from 'lodash';
import { publicationActions } from '@/redux/publication/publicationSlice';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PublicationHomeFullImageVerticalCard from '../PublicationHomeFullImageVerticalCard';
import PublicationHomeNormalCard from '../PublicationHomeNormalCard';
import PublicationHomeStreamCard from '../PublicationHomeStreamCard';
import PublicationHomeListImageCard from '../PublicationHomeListImageCard';

function PublicationTabFeature({ tab }) {
  const dispatch = useDispatch();

  const featurePage = useSelector((state) => state.publication.featurePage);

  const sections = featurePage?.sections;

  const [basePath, setBasePath] = useState();

  useEffect(() => {
    if (tab) {
      dispatch(
        publicationActions.getFeaturePageRequest({ featureId: tab.contents })
      );
    }
  }, [tab]);

  useEffect(() => {
    setBasePath(window.location.origin);
  }, []);

  const getSlicedStories = (stories) => {
    const storiesSliced = [];

    for (let i = 3; i <= stories.length; i += 3) {
      const storyListByThird = _.slice(stories, i - 3, i);
      storiesSliced.push(storyListByThird);
    }
    if (stories.length % 3 !== 0) {
      const storyListByThird = _.takeRight(stories, stories.length % 3);
      storiesSliced.push(storyListByThird);
    }

    return storiesSliced;
  };



  return (
    <div>
      {_.map(sections, (section) => {
        if (section?.designType === 'grid') {
          return (
            <div className="mb-10 flex flex-col overflow-hidden text-ellipsis">
              {_.get(section, 'sectionTitle') && (
                <h2 className="text-slate-500 mb-4 text-2xl font-semibold">
                  {_.get(section, 'sectionTitle')}
                </h2>
              )}
              {_.map(getSlicedStories(section?.stories), (stories) => (
                <div
                  key={_.first(stories)?._id}
                  className={`grid grid-cols-1 w-full sm:grid-cols-2 lg:grid-cols-${_.size(
                    stories
                  )} gap-8`}
                >
                  {_.map(stories, (story) =>
                    section?.isFullStoryGrid ? (
                      <PublicationHomeFullImageVerticalCard
                        smallSize
                        coverImage={story?.coverImage}
                        storyTitle={story?.storyTitle}
                        storyContent={story?.excerpt}
                        link={`${basePath}/story/${story?.storySlug}`}
                      />
                    ) : (
                      <PublicationHomeNormalCard
                        smallSize
                        coverImage={story?.coverImage}
                        storyTitle={story?.storyTitle}
                        storyContent={story?.excerpt}
                        link={`${basePath}/story/${story?.storySlug}`}
                      />
                    )
                  )}
                </div>
              ))}
            </div>
          );
        }
        if (section?.designType === 'stream') {
          return (
            <div className="mb-40">
              <h2 className="text-slate-500 mb-4 text-2xl font-semibold">
                {_.get(section, 'sectionTitle')}
              </h2>
              {_.map(section?.stories, (story) => (
                <PublicationHomeStreamCard
                  storyTitle={story?.storyTitle}
                  storyContent={story?.excerpt}
                  link={`${basePath}/story/${story?.storySlug}`}
                />
              ))}
            </div>
          );
        }
        // designType = list
        return (
          <div className="mb-40">
            <h2 className="text-slate-500 mb-4 text-2xl font-semibold">
              {_.get(section, 'sectionTitle')}
            </h2>
            {_.map(section?.stories, (story) => (
              <PublicationHomeListImageCard
                coverImage={story?.coverImage}
                storyTitle={story?.storyTitle}
                storyContent={story?.excerpt}
                link={`${basePath}/story/${story?.storySlug}`}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default PublicationTabFeature;
