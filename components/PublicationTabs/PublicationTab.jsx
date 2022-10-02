import PublicationTabAbout from './PublicationTabAbout';
import PublicationTabFeature from './PublicationTabFeature';
import PublicationTabStory from './PublicationTabStory';
import PublicationTabTopic from './PublicationTabTopic';

function PublicationTab({ tab, publication }) {
  switch (tab?.tabType) {
    case 'about':
      return <PublicationTabAbout publication={publication} />;

    case 'story':
      return <PublicationTabStory tab={tab} publication={publication} />;

    case 'topic':
      return <PublicationTabTopic tab={tab} publication={publication} />;

    case 'feature':
      return <PublicationTabFeature tab={tab} publication={publication} />;

    default:
      return <div>Error!</div>;
  }
}

export default PublicationTab;
