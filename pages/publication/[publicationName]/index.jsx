
import Layout from '@/layouts/Layout';
import { publicationActions } from '@/redux/publication/publicationSlice';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

export default function PublicationHome() {
  const publication = useSelector((state) => state.publication.publication);
  const navigations = useSelector(
    (state) => state.publication.publicationNavigation
  );
  const router = useRouter();
  const { publicationName } = router.query;
  const dispatch = useDispatch();
  const getPublicationNavigations = (publication) => {
    dispatch(
      publicationActions.getPublicationNavigationRequest(publication._id)
    );
  };
  useEffect(() => {
    if (publication) {
      getPublicationNavigations(publication);
    }
  }, [publication]);
  useEffect(() => {

    if (
      navigations &&
      (_.get(_.first(navigations), 'publication') === publication?._id ||
        _.size(navigations) === 0) &&
      publicationName === publication?.name
    ) {
      router.push(
        `/publication/${publicationName}/${_.first(navigations)?.tabName ?? 'home'}`
      );
    }
  }, [navigations, publicationName]);
  return (
    <div >
      <Layout loading />
    </div>
  );
}
