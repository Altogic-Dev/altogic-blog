import Head from 'next/head';
import Layout from '@/layouts/Layout';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Input from '@/components/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { FileUploader } from 'react-drag-drop-files';
import { uploadFile } from '@/redux/file/fileSlice';
import Button from '@/components/basic/button';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import AddFeatureSection from '@/components/publication/AddFeatureSection';
import { topicsActions } from '@/redux/topics/topicsSlice';
import { publicationActions } from '@/redux/publication/publicationSlice';
import _ from 'lodash';

const fileTypes = ['JPG', 'PNG', 'WEBP', 'JPEG', 'SVG', 'GIF'];

export default function PublicationsNewFeature() {
  const router = useRouter();
  const { publicationName, id } = router.query;
  const featurePage = useSelector((state) => state.publication.featurePage);
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  const [featurePageRequest, setFeaturePageRequest] = useState();
  const [fileUploadError, setFileUploadError] = useState();
  const formSchema = new yup.ObjectSchema({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    link: yup.string().url('Url is not valid').required('Url is required'),
    logo: yup.string().url(),
  });

  const publication = useSelector(
    (state) => state.publication.selectedPublication
  );

  const featStories = useSelector((state) => state.story.featureStories);
  const featSections = useSelector((state) => state.publication.sections);
  const logo = useSelector((state) => state.file.fileLink);
  const user = useSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const checkAuthorization = (publication) => {
    const sessionUser = _.find(
      publication.users,
      (person) => person.user === user._id
    );
    if (
      publicationName &&
      (_.isNil(sessionUser) ||
        !['admin', 'editor'].includes(sessionUser.role) ||
        _.lowerCase(publicationName) !==
          _.lowerCase(publication.publicationName) ||
        _.isNil(publication) ||
        !_.includes(user.publications, publication._id))
    ) {
      router.push('/');
    }
  };

  const getFeature = (featureId) => {
    dispatch(
      publicationActions.getFeaturePageRequest({
        featureId,
      })
    );
  };
  const clearFeature = () => {
    dispatch(publicationActions.clearFeaturePageRequest());
  };

  useEffect(() => {
    if (publication) {
      checkAuthorization(publication);
      dispatch(topicsActions.getPublicationsTopicsRequest(publication?._id));
    }
  }, [publication]);

  const uploadPhotoHandler = () => {
    const fileInput = document.createElement('input');
    fileInput.setAttribute('accept', 'image/*');
    fileInput.click();

    fileInput.onchange = async () => {
      setFile(fileInput.files[0]);
    };
  };

  useEffect(() => {
    if (id) {
      getFeature(id);
    }
  }, [id]);

  useEffect(() => () => clearFeature(), []);
  useEffect(() => {
    if (featurePage) {
      setValue('title', featurePage.title);
      setValue('link', featurePage.link);
      setValue('description', featurePage.description);
    }
  }, [featurePage]);

  const submitFunction = async (data) => {
    setIsLoading(true);
    dispatch(
      uploadFile(file, `${publication.name}-${publication.featurePageCount}`)
    );
    const stories = [];
    Object.keys(featStories).forEach((key) => {
      const story = featStories[key].map((story) => {
        const req = {
          story: story._id,
          publisherName: story.user.name,
          publisherAbout: story.user.about,
          storyTitle: story.title,
          storyContent: story.content,
          publisherUsername: story.username,
          storySlug: story.storySlug,
          excerpt: story.excerpt,
        };
        if (story.storyImages) {
          [req.coverImage] = story.storyImages;
        }
        return req;
      });
      stories.push(story);
    });
    const sections = featSections.map((section, index) => ({
      ...section,
      stories: stories[index],
    }));
    setFeaturePageRequest({
      ...data,
      publication: publication._id,
      sections,
    });
  };

  const sizeCheck = (file) => {
    if (file) setFile();
    const img = new Image();
    img.onload = function () {
      // eslint-disable-next-line react/no-this-in-sfc
      if (this.width > this.height) {
        setFile(file);
      } else {
        setFileUploadError('Choose a different image');
      }
    };
    img.onerror = function () {
      setFileUploadError('Choose a different image');
    };
    img.src = URL.createObjectURL(file);
  };
  useEffect(() => {
    if (logo) {
      if (!id) {
        dispatch(
          publicationActions.createFeaturePageRequest({
            ...featurePageRequest,
            logo,
          })
        );
      } else {
        dispatch(
          publicationActions.updateFeaturePageRequest({
            ...featurePageRequest,
            logo,
          })
        );
      }

      setIsLoading(false);
      router.push(`/publication/${publication.publicationName}/feature`);
    }
  }, [logo]);

  return (
    <div>
      <Head>
        <title>Altogic Medium Blog App Publications New Feature</title>
        <meta
          name="description"
          content="Altogic Medium Blog App Publications New Feature"
        />
      </Head>
      <Layout>
        <form
          onSubmit={handleSubmit(submitFunction)}
          className="max-w-screen-xl mx-auto px-4 lg:px-8 pb-16"
        >
          <div className="flex flex-col gap-4 mt-8 mb-[80px] md:mt-[60px]">
            <div className="flex flex-col md:flex-row md:items-center justify-between w-full">
              <h1 className="text-slate-700 mb-8 md:mb-0 text-3xl md:text-4xl xl:text-5xl font-bold tracking-md">
                New feature page
              </h1>
              <div className="flex items-center gap-4">
                <Button
                  loading={isLoading}
                  type="submit"
                  className="flex items-center justify-center w-full md:w-auto px-[18px] py-2.5 text-md font-medium tracking-sm rounded-full text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Save
                </Button>
                <Button
                  onClick={() =>
                    router.push(`/publication/${publicationName}/feature`)
                  }
                  className="inline-flex items-center justify-center w-full md:w-auto px-[18px] py-2.5 border border-gray-300 text-sm font-medium tracking-sm rounded-full text-slate-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
          <div>
            <div className="mb-24">
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-slate-700 mb-3 text-lg"
                  >
                    Title*
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <Input
                      error={errors.title}
                      type="text"
                      name="title"
                      id="title"
                      register={register('title')}
                      placeholder="Type a title for your feature page"
                      className="block w-full min-h-[44px] placeholder-slate-500 text-base tracking-sm border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="link"
                    className="block text-slate-700 mb-3 text-lg"
                  >
                    Link*
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <Input
                      error={errors.link}
                      type="text"
                      name="link"
                      id="link"
                      register={register('link')}
                      placeholder="Type a custom link for your feature page"
                      className="block w-full min-h-[44px] placeholder-slate-500 text-base tracking-sm border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                    />
                    <p className="mt-1.5 text-sm text-slate-500">
                      Link: algotic.com/publication/...
                    </p>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-slate-700 mb-3 text-lg"
                  >
                    Description*
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <Input
                      error={errors.description}
                      type="text"
                      name="description"
                      id="description"
                      register={register('description')}
                      placeholder="Type a short description"
                      className="block w-full min-h-[44px] placeholder-slate-500 text-base tracking-sm border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                    />
                    <p className="mt-1.5 text-sm text-slate-500">
                      The description is used on search engine results pages.
                      Good descriptions summarize the page and are about 160
                      characters long.
                    </p>
                  </div>
                </div>
                <div className="grid lg:grid-cols-2 items-end gap-8">
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-slate-700 mb-3 text-lg"
                    >
                      Header logo*
                    </label>
                    <p className="text-sm">
                      This image replaces the title at the top of your feature
                      page. It should be at least 1200px wide and 350px tall.
                      <br />
                      <br />
                      Use SVG, PNG, JPG or GIF
                    </p>
                  </div>
                  <div className="flex items-center justify-center max-w-[280px] max-h-[124px] py-4 border border-gray-300 rounded-md overflow-hidden">
                    <FileUploader
                      handleChange={(file) => {
                        sizeCheck(file);
                      }}
                      name="file"
                      types={fileTypes}
                    >
                      <div className="text-center">
                        {file || featurePage?.logo ? (
                          <img
                            className=" object-cover"
                            src={
                              file
                                ? URL.createObjectURL(file)
                                : featurePage?.logo
                            }
                            alt={router.query.publicationName}
                          />
                        ) : (
                          <>
                            <span className="inline-flex items-center justify-center w-10 h-10 mb-3 rounded-full bg-gray-100 ring-8 ring-gray-50">
                              <svg
                                className="w-5 h-5 text-slate-700"
                                viewBox="0 0 22 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M3.5 21V16M3.5 6V1M1 3.5H6M1 18.5H6M12 2L10.2658 6.50886C9.98381 7.24209 9.84281 7.60871 9.62353 7.91709C9.42919 8.1904 9.1904 8.42919 8.91709 8.62353C8.60871 8.8428 8.24209 8.98381 7.50886 9.26582L3 11L7.50886 12.7342C8.24209 13.0162 8.60871 13.1572 8.91709 13.3765C9.1904 13.5708 9.42919 13.8096 9.62353 14.0829C9.84281 14.3913 9.98381 14.7579 10.2658 15.4911L12 20L13.7342 15.4911C14.0162 14.7579 14.1572 14.3913 14.3765 14.0829C14.5708 13.8096 14.8096 13.5708 15.0829 13.3765C15.3913 13.1572 15.7579 13.0162 16.4911 12.7342L21 11L16.4911 9.26582C15.7579 8.98381 15.3913 8.8428 15.0829 8.62353C14.8096 8.42919 14.5708 8.1904 14.3765 7.91709C14.1572 7.60871 14.0162 7.24209 13.7342 6.50886L12 2Z"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>

                            <div className="flex text-sm text-gray-600">
                              <Button
                                onClick={uploadPhotoHandler}
                                htmlFor="file-upload"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-purple-700 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500"
                              >
                                <span>Click to upload</span>
                                <Input
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  className="sr-only"
                                />
                              </Button>
                              <p className="text-slate-600 pl-1">
                                or drag and drop
                              </p>
                            </div>
                          </>
                        )}
                        {(errors?.file?.message || fileUploadError) && (
                          <span className="inline-block text-sm text-red-600">
                            {fileUploadError ?? errors.file.message}
                          </span>
                        )}
                      </div>
                    </FileUploader>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <AddFeatureSection sections={featurePage && featurePage.sections} />
      </Layout>
    </div>
  );
}
