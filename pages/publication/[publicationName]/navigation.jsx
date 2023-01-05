import React, { useState, useEffect } from 'react';
import HeadContent from '@/components/general/HeadContent';
import Layout from '@/layouts/Layout';
import { Switch } from '@headlessui/react';
import { classNames } from '@/utils/utils';
import NavigationForm from '@/components/Publications/NavigationForm';
import { useDispatch, useSelector } from 'react-redux';
import { storyActions } from '@/redux/story/storySlice';
import { topicsActions } from '@/redux/topics/topicsSlice';
import { publicationActions } from '@/redux/publication/publicationSlice';
import { PlusIcon, TrashIcon } from '@heroicons/react/outline';
import Button from '@/components/basic/button';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import Input from '@/components/Input';
import { useRouter } from 'next/router';
import _ from 'lodash';
import { Drag } from '@icon-park/react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

export default function PublicationsNavigation() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { publicationName } = router.query;

  const [enabled, setEnabled] = useState(false);
  const [navigationReq, setNavigationReq] = useState([]);

  const publication = useSelector(
    (state) => state.publication.selectedPublication
  );
  const isLoading = useSelector((state) => state.publication.isLoading);
  const [onDrag, setOnDrag] = useState(false);
  const publicationNavigation = useSelector(
    (state) => state.publication.publicationNavigation
  );
  const user = useSelector((state) => state.auth.user);

  const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
    externalLink: yup.string().url('Url must be valid'),
  });

  const {
    register,
    formState: { errors },
    setValue,
    resetField,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const [navigationList, setNavigationList] = useState();

  const handleSubmit = () => {
    const formList = document.querySelectorAll('form');

    formList.forEach((form) => {
      let req = {};
      // eslint-disable-next-line no-restricted-syntax
      for (const pair of new FormData(form)) {
        if (pair[0] === 'title') {
          req = {
            ...req,
            tabName: pair[1],
          };
        }

        if (pair[0].includes('type')) {
          req = {
            ...req,
            tabType: pair[1],
          };
        }

        if (pair[0].includes('url')) {
          req = {
            ...req,
            contents: pair[1],
          };
        }
        if (pair[0].includes('externalLink')) {
          req = {
            ...req,
            externalLink: pair[1],
            tabType: 'link',
          };
        }
        if (pair[0] === 'url[story]') {
          req = {
            ...req,
            story: pair[1],
          };
        }
        req.publication = publication._id;
      }
      setNavigationReq((prev) => [...prev, req]);
    });
  };

  const deleteExternalLink = () => {
    const list = [...navigationList];
    list.splice(
      navigationList.indexOf((n) => n.tabType === 'link'),
      1
    );
    resetField('externalLink');
    resetField('title');
    setNavigationList(list);
    setEnabled(false);
  };

  const checkAuthorization = (publication) => {
    const sessionUser = _.find(
      publication.users,
      (person) => person.user === user._id
    );

    if (
      publicationName &&
      (_.isNil(sessionUser) ||
        !['admin', 'editor'].includes(sessionUser.role) ||
        _.lowerCase(publicationName) !== _.lowerCase(publication.name))
    ) {
      router.push('/');
    }
  };
  const getPublicationDetails = () => {
    if (publication) {
      checkAuthorization(publication);
      dispatch(topicsActions.getPublicationsTopicsRequest(publication?._id));
      dispatch(storyActions.getPublicationsStoriesRequest(publication?._id));
      dispatch(
        publicationActions.getFeaturePagesByPublicationRequest(publication?._id)
      );
      dispatch(
        publicationActions.getPublicationNavigationRequest(publication?._id)
      );
    }
  };

  const handleCancel = () => {
    getPublicationDetails();
  };

  useEffect(() => {
    if (navigationReq.length > 0) {
      const result = navigationReq.map((item, index) => {
        const temp = { ...item };
        temp.order = index;
        return temp;
      });
      if (_.size(publicationNavigation) > 0) {
        dispatch(
          publicationActions.updatePublicationNavigationRequest({
            navigation: result,
            publicationId: publication._id,
          })
        );
      } else {
        dispatch(publicationActions.createPublicationNavigationRequest(result));
      }
      setNavigationReq([]);
    }
  }, [navigationReq]);

  useEffect(() => {
    getPublicationDetails();
  }, [publication]);
  useEffect(() => {
    if (_.size(publicationNavigation) > 0) {
      setNavigationList(
        publicationNavigation
          .filter((pn) => pn.tabType !== 'link')
          .map((nav, index) => (
            <NavigationForm
              navigationList={navigationList}
              setNavigationList={setNavigationList}
              index={index}
              key={nav._id}
              navigation={nav}
            />
          ))
      );
      const link = publicationNavigation.find((nav) => nav.tabType === 'link');
      if (link) {
        setEnabled(true);
        setValue('externalLink', link.externalLink);
        setValue('title', link.tabName);
      }
    }
  }, [publicationNavigation]);

  const addNewNavigationForm = () => {
    if (_.isEmpty(navigationList)) {
      setNavigationList([<NavigationForm onSubmit={handleSubmit} key={0} />]);
    } else
      setNavigationList([
        ...navigationList,
        <NavigationForm onSubmit={handleSubmit} key={_.size(navigationList)} />,
      ]);
  };
  const onDragEnd = (result, navigationList, setNavigationList) => {
    if (result.destination) {
      const newItems = [...navigationList];
      const [removed] = newItems.splice(result.source.index, 1);
      newItems?.splice(result.destination.index, 0, removed);

      setNavigationList(newItems);
    }
    setOnDrag(false);
  };

  return (
    <div>
      <HeadContent>
        <title>Altogic Medium Blog App Publications Navigation</title>
        <meta
          name="description"
          content="Altogic Medium Blog App Publications Navigation"
        />
      </HeadContent>
      <Layout>
        <div className="h-screen max-w-screen-xl mx-auto px-4 lg:px-8 pb-16">
          <div className="flex flex-col gap-4 my-8 md:mt-[60px]">
            <div className="flex items-center justify-between w-full mb-[60px]">
              <h1 className="text-slate-700 mb-4 md:mb-0 text-3xl md:text-4xl xl:text-5xl font-bold tracking-md">
                {publication?.name} navigation
              </h1>
              <div className="flex items-center w-full sm:w-auto gap-4">
                <Button
                  type="submit"
                  loading={isLoading}
                  className="flex items-center justify-center w-full md:w-auto px-[18px] py-2.5 text-md font-medium tracking-sm rounded-full text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  onClick={handleSubmit}
                >
                  Save
                </Button>
                <Button
                  onClick={handleCancel}
                  className="flex items-center justify-center w-full md:w-auto px-[18px] py-2.5 border border-gray-300 text-md font-medium tracking-sm rounded-full text-slate-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Cancel
                </Button>
              </div>
            </div>
            <h2 className="text-slate-500 tracking-sm">
              Add tabs and point them to tags or individual stories to create
              navigation. Navigation will be shown on homepage and stories
              within your publication.
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center gap-4">
              <div className="w-full grid grid-cols-3 gap-4 items-center">
                <label
                  htmlFor="title"
                  className="block text-slate-700 mb-4 text-lg font-semibold"
                >
                  Tab Name
                </label>
                <span className="block text-slate-700 mb-4 text-lg font-semibold">
                  Tab Type
                </span>
                <label
                  htmlFor="url"
                  className="block text-slate-700 mb-4 text-lg font-semibold"
                >
                  Contents
                </label>
              </div>
            </div>
            <DragDropContext
              onDragStart={() => setOnDrag(true)}
              onDragEnd={(result) =>
                onDragEnd(result, navigationList, setNavigationList)
              }
            >
              <Droppable droppableId="droppable">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {_.map(navigationList, (navigationForm, index) => (
                      <Draggable
                        key={navigationForm.key}
                        index={index}
                        draggableId={navigationForm.key}
                      >
                        {(provided) => (
                          <div
                            className="flex gap-3 items-center"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Drag size={25} />
                            {navigationForm}
                            <Button
                              onClick={() => {
                                const newNavigationList = navigationList.filter(
                                  (item, itemIndex) => itemIndex !== index
                                );
                                setNavigationList(newNavigationList);
                              }}
                              className="inline-flex items-center justify-center w-11 h-11 border border-gray-300 rounded-full hover:bg-gray-100"
                            >
                              <TrashIcon className="w-5 h-5 text-slate-700" />
                            </Button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            {onDrag && <div className="h-20" />}
            {!onDrag && (
              <Button
                onClick={addNewNavigationForm}
                className="inline-flex items-center gap-2 mt-3 text-sm tracking-sm text-purple-700 w-[10%] over hover:text-purple-800"
              >
                <PlusIcon className="w-5 h-5" />
                Add another
              </Button>
            )}
            <div className="mt-12">
              <div>
                <div className="flex-1 mb-4 h-7">
                  <Switch.Group as="div" className="flex items-center">
                    <Switch
                      checked={enabled}
                      onChange={setEnabled}
                      className={classNames(
                        enabled ? 'bg-purple-600' : 'bg-gray-200',
                        'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={classNames(
                          enabled ? 'translate-x-5' : 'translate-x-0',
                          'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                        )}
                      />
                    </Switch>
                    <Switch.Label as="span" className="ml-3">
                      <span className="text-sm font-medium text-slate-700 whitespace-nowrap">
                        Add a tab linking to a different site (e.g. your
                        non-Blog site, or a store)
                      </span>
                    </Switch.Label>
                  </Switch.Group>
                </div>

                {enabled && (
                  <form className="flex items-center justify-between gap-4">
                    <div className="flex-1 h-14">
                      <Input
                        type="text"
                        name="title"
                        id="title"
                        register={register('title')}
                        error={errors.title}
                        placeholder="Type tab name..."
                        className="block w-full h-11 text-slate-500 text-base tracking-sm border-gray-300 rounded-md placeholder-slate-500 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div className="flex-1 h-14">
                      <Input
                        type="text"
                        name="externalLink"
                        id="externalLink"
                        register={register('externalLink')}
                        placeholder="Type a link to your site"
                        error={errors.externalLink}
                        className="block w-full h-11 text-slate-500 text-base tracking-sm border-gray-300 rounded-md placeholder-slate-500 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="block lg:hidden text-slate-700 mb-4 text-lg font-semibold opacity-0">
                        Move
                      </span>
                      <button
                        onClick={deleteExternalLink}
                        type="button"
                        className="inline-flex items-center justify-center w-11 h-11 border border-gray-300 rounded-full hover:bg-gray-100"
                      >
                        <TrashIcon className="w-5 h-5 text-slate-700" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
