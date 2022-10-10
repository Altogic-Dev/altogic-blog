import Head from 'next/head';
import Layout from '@/layouts/Layout';
import Button from '@/components/basic/button';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Input from '@/components/Input';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { fileActions } from '@/redux/file/fileSlice';
import { publicationActions } from '@/redux/publication/publicationSlice';

export default function PublicationsNewsletterSettings() {
  const dispatch = useDispatch();
  const formSchema = new yup.ObjectSchema({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    link: yup.string().url('Url is not valid').required('Url is required'),
    file: yup.string().required('Logo is required'),
  });

  const [file, setFile] = useState();

  // const fileLink = useSelector((state) => state.file.fileLink);
  // const subscribers = useSelector((state) => state.publication.subscribers);
  const publication = useSelector((state) => state.publication.publication);
  const newsletter = useSelector((state) => state.publication.newsletter);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const submitFunction = (data) => {
    console.log(data);
    dispatch(
      fileActions.uploadFileRequest({
        file,
        name: `${publication.name}-${publication.featurePageCount}`,
      })
    );
    dispatch(
      publicationActions.uptadeNewsletterRequest({
        newsletter: newsletter._id,
      })
    );
  };

  const uploadPhotoHandler = () => {
    const fileInput = document.createElement('input');

    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('accept', 'image/*');
    fileInput.click();

    fileInput.onchange = async () => {
      setFile(fileInput.files[0]);
    };
  };

  const exportList = () => {
    dispatch(
      publicationActions.getSubscribersRequest({
        publication: publication._id,
      })
    );
  };

  return (
    <div>
      <Head>
        <title>Altogic Medium Blog App Publications Newsletter Settings</title>
        <metae
          name="description"
          content="Altogic Medium Blog App Publications Newsletter Settings"
        />
      </Head>
      <Layout>
        <form
          onSubmit={handleSubmit(submitFunction)}
          className="max-w-screen-xl mx-auto px-4 lg:px-8 pb-16"
        >
          <div className="flex flex-col gap-4 my-8 lg:mb-[80px] lg:mt-[60px]">
            <div className="flex flex-col md:flex-row md:items-center justify-between w-full lg:mb-[72px]">
              <h1 className="text-slate-700 mb-8 lg:mb-0 text-3xl md:text-4xl xl:text-5xl font-bold tracking-md">
                HiThemes newsletter settings
              </h1>
              <div className="hidden lg:flex items-center gap-4">
                <Button extraClasses="px-[18px] py-2.5">Save</Button>
                <Button primaryColor extraClasses="px-[18px] py-2.5">
                  Cancel
                </Button>
              </div>
            </div>
            <div className="pb-2 lg:mb-16 border-b border-gray-200">
              <h2 className="text-slate-700 text-2xl font-medium tracking-md">
                Edit your newsletter
              </h2>
            </div>
          </div>
          <div>
            <div>
              <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8">
                <div>
                  <label
                    htmlFor="newsletter-name"
                    className="block text-slate-700 mb-3 text-lg"
                  >
                    Newsletter name*
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <Input
                      error={errors.name}
                      register={register('name')}
                      type="text"
                      name="newsletter-name"
                      id="newsletter-name"
                      placeholder="HiThemes Biweekly Newsletter"
                      className="block w-full min-h-[44px] text-slate-500 placeholder-slate-500 text-base tracking-sm border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="newsletter-description"
                    className="block text-slate-700 mb-3 text-lg"
                  >
                    Newsletter description*
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <Input
                      error={errors.description}
                      register={register('description')}
                      type="text"
                      name="newsletter-description"
                      id="newsletter-description"
                      placeholder="Type your description"
                      className="block w-full min-h-[44px] text-slate-500 placeholder-slate-500 text-base tracking-sm border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                    />
                    <p className="mt-1.5 text-sm text-slate-500">
                      Describe your newsletter’s theme and when it’s sent (200
                      characters max). This description will be used in
                      newsletter promotions, search results, and more. You can
                      edit this later.
                    </p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 items-end gap-8">
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-slate-700 mb-3 text-lg"
                    >
                      Newsletter avatar*
                    </label>
                    <p className="text-slate-500 text-sm">
                      Your avatar is an icon for your newsletter. Make sure
                      it&apos;s a square of at least 1000px per side, under 25
                      mb, and either a .png, .jpg, or .gif.
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <img
                      className="w-16 h-16 rounded-full"
                      src="./hi-avatar.svg"
                      alt=""
                    />
                    <div className="space-x-4">
                      <Button
                        onClick={() => setFile()}
                        className="text-slate-600 text-sm font-medium tracking-sm"
                      >
                        Delete
                      </Button>
                      <Button
                        onClick={uploadPhotoHandler}
                        className="text-purple-700 text-sm font-medium tracking-sm"
                      >
                        Change Avatar
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-8">
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-slate-700 mb-3 text-lg"
                    >
                      Export subscribers
                    </label>
                    <p className="text-slate-500 text-sm">
                      Get a list of subscribers who’ve opted to share their
                      email address. So far, 23456789 of your subscribers have
                      opted in.
                    </p>
                  </div>
                  <Button
                    onClick={exportList}
                    className="inline-flex items-center justify-center flex-shrink-0 px-7 py-2.5 border border-gray-300 text-base font-medium tracking-sm rounded-full text-slate-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Export list
                  </Button>
                </div>
                <div className="col-span-2">
                  <span className="inline-block text-slate-700 mb-3 text-lg tracking-sm">
                    Promotion
                  </span>
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <div className="flex items-center h-5">
                        <input
                          id="publications-stories"
                          name="publications-stories"
                          type="checkbox"
                          className="focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="publications-stories"
                          className="text-slate-700 text-sm font-medium"
                        >
                          Promote your newsletter on your publication’s stories.
                        </label>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center h-5">
                        <input
                          id="publications-homepage"
                          name="publications-homepage"
                          type="checkbox"
                          className="focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="publications-homepage"
                          className="text-slate-700 text-sm font-medium"
                        >
                          Show newsletter stories on your publication&apos;s
                          homepage.
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr className="my-8" />
            <p className="text-slate-500 mb-8 lg:mb-0 text-sm tracking-sm">
              All HiThemes editors can contribute to this newsletter. Existing
              altogic email subscribers will be automatically subscribed.
            </p>
            <div className="flex lg:hidden items-center justify-end gap-4">
              <button
                type="button"
                className="flex items-center justify-center w-full md:w-auto px-[18px] py-2.5 text-md font-medium tracking-sm rounded-full text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Save
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center w-full md:w-auto px-[18px] py-2.5 border border-gray-300 text-sm font-medium tracking-sm rounded-full text-slate-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </Layout>
    </div>
  );
}
