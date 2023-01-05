import { publicationActions } from '@/redux/publication/publicationSlice';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { ClipLoader } from 'react-spinners';

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
    console.log(publication);
    console.log(navigations);

    if (
      navigations &&
      (_.get(_.first(navigations), 'publication') === publication?._id ||
        _.size(navigations) === 0) &&
      publicationName === publication?.name
    ) {
      router.push(
        `/publication/${publicationName}/${navigations[0]?.tabName ?? 'home'}`
      );
    }
  }, [navigations, publicationName]);
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center">
      <ClipLoader color="#9333ea" size={100} />
    </div>
  );
}
