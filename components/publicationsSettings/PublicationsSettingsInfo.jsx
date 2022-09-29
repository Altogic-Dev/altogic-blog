import { authActions } from '@/redux/auth/authSlice';
import { fileActions } from '@/redux/file/fileSlice';
import { publicationActions } from '@/redux/publication/publicationSlice';
import { removeSpaces } from '@/utils/utils';
import { PlusIcon } from '@heroicons/react/solid';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../Input';
import TagInput from '../TagInput';
import UserInput from '../UserInput';
import PublicationSettingsSuggestions from './suggestions/PublicationSettingsSuggestions';

export default function PublicationSettingsInfo() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { publicationName } = router.query;

  const userFromLocale = useSelector((state) => state.auth.user);
  const publication = useSelector((state) => state.publication.publication);
  const uploadedFileLinks = useSelector((state) => state.file.fileLinks);
  const isValid = useSelector(
    (state) => state.publication.isPublicationnameValid
  );
  const publicationname = useSelector(
    (state) => state.publication.publicationname
  );
  const foundUsers = useSelector((state) => state.auth.foundUsers);
  const loading = useSelector((state) => state.auth.isLoading);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
  } = useForm();
  const [tags, setTags] = useState([]);
  const [inpEditor, setInpEditor] = useState('');
  const [editors, setEditors] = useState([]);
  const [inpWriter, setInpWriter] = useState('');
  const [writers, setWriters] = useState([]);
  const [user, setUser] = useState();

  const addTagFromRecommended = (tag) => {
    if (!_.includes(tags, tag) && _.size(tags) < 5) {
      setTags((prev) => [tag, ...prev]);
    }
  };

  const handleUploadPhoto = (name, existingFile) => {
    const fileInput = document.createElement('input');

    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('accept', 'image/*');
    fileInput.click();

    fileInput.onchange = async () => {
      const file = fileInput.files[0];
      dispatch(
        fileActions.uploadFileRequest({
          file,
          name: `${publication?.name}-${name}`,
          existingFile,
        })
      );
    };
  };

  const handleAddUser = (isWriter, user) => {
    if (isWriter) {
      const userIds = _.map(writers, '_id');
      if (!_.includes(userIds, user._id)) {
        setWriters((prev) => [...prev, user]);
      }
      setInpWriter('');
    } else {
      const userIds = _.map(editors, '_id');
      if (!_.includes(userIds, user._id)) {
        setEditors((prev) => [...prev, user]);
      }
      setInpEditor('');
    }
  };

  const handleSearch = (e) => {
    const { name, value } = e.target;

    if (name === 'writer') setInpWriter(value);
    else setInpEditor(value);

    dispatch(authActions.searchUserByUsernameRequest(value));
  };

  const handleSave = (formValues) => {
    const writerList = _.map(writers, (writer) => ({
      user: writer._id,
      name: writer.name,
      role: 'writer',
    }));
    const editorList = _.map(editors, (editor) => ({
      user: editor._id,
      name: editor.name,
      role: 'editor',
    }));
    const editedPublication = {
      ...publication,
      ...formValues,
      profilePicture: uploadedFileLinks?.profilePicture,
      coverImage: uploadedFileLinks?.coverImage,
      logo: uploadedFileLinks?.logo,
      tags,
      users: [...writerList, ...editorList],
      publicationName: publicationname,
    };
    dispatch(publicationActions.updatePublicationRequest(editedPublication));
  };

  useEffect(() => {
    if (publicationName) {
      dispatch(
        publicationActions.getPublicationRequest(publicationName.toLowerCase())
      );
    }
  }, [publicationName]);

  useEffect(() => {
    if (publication) {
      dispatch(
        fileActions.setUploadedFiles({
          profilePicture: publication?.profilePicture,
          coverImage: publication?.coverImage,
          logo: publication?.logo,
        })
      );
      setValue('name', publication.name);
      setValue('description', publication.description);
      setValue('tagline', publication.tagline);
      setValue('email', publication.email);
      setValue('twitter', publication.twitter);
      setValue('facebook', publication.facebook);
      setValue('linkedin', publication.linkedin);
      setTags(publication.tags || []);
      setEditors(_.filter(publication.users, (user) => user.role === 'editor'));
      setWriters(_.filter(publication.users, (user) => user.role === 'writer'));
    }
  }, [publication]);

  useEffect(() => {
    if (userFromLocale) {
      setUser(userFromLocale);
    }
  }, [userFromLocale]);

  useEffect(() => {
    const publicationname = removeSpaces(watch('name'));
    if (publicationname) {
      dispatch(
        publicationActions.isPublicationnameExistRequest({
          publicationId: _.get(publication, '_id'),
          publicationname,
        })
      );
    }
  }, [watch('name')]);

  useEffect(() => {
    if (!isValid) {
      setError('name', {
        type: 'manuel',
        message: 'This name is already taken',
      });
    } else {
      clearErrors('name');
    }
  }, [isValid]);

  return (
    <div className="max-w-screen-xl mx-auto px-4 lg:px-8 mt-8 lg:mt-20">
      <form onSubmit={handleSubmit(handleSave)} className="mb-24">
        <div className="pb-2 mb-8 border-b border-gray-200">
          <h2 className="text-slate-700 text-2xl font-medium tracking-md">
            General
          </h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <label
              htmlFor="publication-name"
              className="block text-slate-700 mb-3 text-lg"
            >
              Name*
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Type your publication name"
                register={register('name')}
                className="block w-full min-h-[44px] text-slate-500 placeholder-slate-500 text-base tracking-sm border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                error={errors.name}
              />
              <p className="mt-1.5 text-sm text-slate-500">
                Link: medium.com/{publicationname}
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
              <input
                type="text"
                name="description"
                id="description"
                placeholder="Type your description"
                className="block w-full min-h-[44px] text-slate-500 placeholder-slate-500 text-base tracking-sm border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                {...register('description')}
              />
              <p className="mt-1.5 text-sm text-slate-500">
                The description is longer, and appears in story footers, search
                results and the like. Max 280 characters.
              </p>
            </div>
          </div>
          <div>
            <label
              htmlFor="tagline"
              className="block text-slate-700 mb-3 text-lg"
            >
              Tagline*
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="tagline"
                id="tagline"
                placeholder="Type a short tagline"
                className="block w-full min-h-[44px] text-slate-500 placeholder-slate-500 text-base tracking-sm border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                {...register('tagline')}
              />
              <p className="mt-1.5 text-sm text-slate-500">
                The tagline is short and appears on your publication’s homepage.
                It’s a quick way to tell readers about your publication. Max 100
                characters.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 items-center gap-8">
            <div>
              <label
                htmlFor="description"
                className="block text-slate-700 mb-3 text-lg"
              >
                Publication avatar*
              </label>
              <p className="text-slate-500 text-sm">
                The avatar appears with your stories across Medium. Recommended
                size: Square, at least 1000 pixels per side File type: JPG, PNG
                or GIF
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <img
                className="w-16 h-16 rounded-full"
                src={_.get(uploadedFileLinks, 'profilePicture')}
                alt=""
              />
              <div className="space-x-4">
                <button
                  type="button"
                  className="text-slate-600 text-sm font-medium tracking-sm"
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="text-purple-700 text-sm font-medium tracking-sm"
                  onClick={() =>
                    handleUploadPhoto(
                      'profilePicture',
                      publication?.profilePicture
                    )
                  }
                >
                  Change Avatar
                </button>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-8 lg:my-14 border-gray-200" />
        <div className="grid lg:grid-cols-2 gap-8 mb-14">
          <div className="grid md:grid-cols-2 items-center gap-8">
            <div>
              <label
                htmlFor="description"
                className="block text-slate-700 mb-3 text-lg"
              >
                Publication logo
              </label>
              <p className="text-slate-500 text-sm">
                The logo is displayed at the top of your publication. We
                recommend the logo have your publication’s name and a
                transparent background. <br /> Recommended size: Each side of
                the logo should be at least 400 pixels wide File type: JPG, PNG
                or GIF
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <img
                className="w-16 h-16 rounded-full"
                src={_.get(uploadedFileLinks, 'logo')}
                alt=""
              />
              <div className="space-x-4">
                <button
                  type="button"
                  className="text-slate-600 text-sm font-medium tracking-sm"
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="text-purple-700 text-sm font-medium tracking-sm"
                  onClick={() => handleUploadPhoto('logo', publication?.logo)}
                >
                  Change Logo
                </button>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 items-center gap-8">
            <div>
              <label
                htmlFor="description"
                className="block text-slate-700 mb-3 text-lg"
              >
                Publication cover image
              </label>
              <p className="text-slate-500 text-sm">
                The cover image is used to promote your publication on Blog.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <img
                className="w-16 h-16 rounded-full"
                src={_.get(uploadedFileLinks, 'coverImage')}
                alt=""
              />
              <div className="space-x-4">
                <button
                  type="button"
                  className="text-slate-600 text-sm font-medium tracking-sm"
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="text-purple-700 text-sm font-medium tracking-sm"
                  onClick={() =>
                    handleUploadPhoto('coverImage', publication?.coverImage)
                  }
                >
                  Change Cover Image
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="pb-2 mb-8 border-b border-gray-200">
          <h2 className="text-slate-700 text-2xl font-medium tracking-md">
            Social and tags
          </h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 mb-14">
          <div className="grid md:grid-cols-[180px,1fr] gap-8">
            <div>
              <h6 className="text-slate-700 mb-3 text-lg tracking-sm">
                Contact info
              </h6>
              <p className="text-slate-500 text-sm tracking-sm">
                These links will be public.
              </p>
            </div>
            <div className="space-y-3">
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-slate-500"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M1.66797 5.83334L8.47207 10.5962C9.02304 10.9819 9.29853 11.1747 9.59819 11.2494C9.86288 11.3154 10.1397 11.3154 10.4044 11.2494C10.7041 11.1747 10.9796 10.9819 11.5305 10.5962L18.3346 5.83334M5.66797 16.6667H14.3346C15.7348 16.6667 16.4348 16.6667 16.9696 16.3942C17.44 16.1545 17.8225 15.7721 18.0622 15.3017C18.3346 14.7669 18.3346 14.0668 18.3346 12.6667V7.33334C18.3346 5.93321 18.3346 5.23315 18.0622 4.69837C17.8225 4.22796 17.44 3.84551 16.9696 3.60583C16.4348 3.33334 15.7348 3.33334 14.3346 3.33334H5.66797C4.26784 3.33334 3.56777 3.33334 3.03299 3.60583C2.56259 3.84551 2.18014 4.22796 1.94045 4.69837C1.66797 5.23315 1.66797 5.93321 1.66797 7.33334V12.6667C1.66797 14.0668 1.66797 14.7669 1.94045 15.3017C2.18014 15.7721 2.56259 16.1545 3.03299 16.3942C3.56777 16.6667 4.26784 16.6667 5.66797 16.6667Z"
                      stroke="currentColor"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="info@hithemes.io"
                  className="block w-full min-h-[44px] text-slate-500 placeholder-slate-500 pl-10 text-base tracking-sm border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  {...register('email')}
                />
              </div>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-slate-500"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M17.3774 6.23312C17.384 6.39803 17.3861 6.56289 17.3861 6.7278C17.3861 11.7278 13.7751 17.5 7.17174 17.5C5.1433 17.5 3.25715 16.8703 1.66797 15.7983C1.94889 15.8283 2.23418 15.8509 2.52385 15.8509C4.2057 15.8509 5.75476 15.2435 6.98349 14.2241C5.41255 14.2016 4.08605 13.0996 3.62855 11.6004C3.84818 11.6453 4.07436 11.6679 4.30566 11.6679C4.63181 11.6679 4.94848 11.623 5.25201 11.533C3.60811 11.1882 2.3699 9.65899 2.3699 7.82241C2.3699 7.79992 2.3699 7.79238 2.3699 7.77739C2.85439 8.05475 3.40892 8.22708 3.99775 8.24956C3.03314 7.56741 2.39907 6.40552 2.39907 5.09367C2.39907 4.40402 2.57564 3.75181 2.88648 3.1896C4.65661 5.48345 7.30309 6.99022 10.2866 7.14764C10.2253 6.87028 10.194 6.578 10.194 6.28564C10.194 4.19419 11.8014 2.5 13.7846 2.5C14.817 2.5 15.7495 2.95734 16.404 3.69197C17.2234 3.52705 17.991 3.21223 18.6857 2.77745C18.4164 3.66201 17.848 4.40398 17.1052 4.86875C17.832 4.77879 18.5251 4.57655 19.168 4.2767C18.6857 5.03382 18.0786 5.70088 17.3774 6.23312Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  name="twitter"
                  id="twitter"
                  placeholder="@hithemes.io"
                  className="block w-full min-h-[44px] text-slate-500 placeholder-slate-500 pl-10 text-base tracking-sm border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  {...register('twitter')}
                />
              </div>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-slate-500"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.742188 10.0098C0.742188 14.5882 4.086 18.395 8.45867 19.1667L8.51027 19.1254C8.49308 19.1221 8.47588 19.1187 8.45869 19.1152V12.582H6.14375V10.0098H8.45869V7.95206C8.45869 5.63712 9.95054 4.35104 12.0597 4.35104C12.7285 4.35104 13.4487 4.45393 14.1174 4.55681V6.9232H12.9342C11.8025 6.9232 11.5453 7.48907 11.5453 8.20928V10.0098H14.0146L13.603 12.582H11.5453V19.1152C11.5281 19.1187 11.5109 19.1221 11.4937 19.1254L11.5453 19.1667C15.9179 18.395 19.2617 14.5882 19.2617 10.0098C19.2617 4.9169 15.0948 0.75 10.002 0.75C4.90909 0.75 0.742188 4.9169 0.742188 10.0098Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  name="facebook"
                  id="facebook"
                  placeholder="@hithemes.io"
                  className="block w-full min-h-[44px] text-slate-500 placeholder-slate-500 pl-10 text-base tracking-sm border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  {...register('facebook')}
                />
              </div>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-slate-500"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2.85097 1.66669C2.19762 1.66669 1.66797 2.19634 1.66797 2.84969V17.1503C1.66797 17.8037 2.19762 18.3334 2.85097 18.3334H17.1516C17.805 18.3334 18.3346 17.8037 18.3346 17.1503V2.84969C18.3346 2.19634 17.805 1.66669 17.1516 1.66669H2.85097ZM5.40887 6.84254C6.20738 6.84254 6.8547 6.19522 6.8547 5.39671C6.8547 4.5982 6.20738 3.95087 5.40887 3.95087C4.61036 3.95087 3.96304 4.5982 3.96304 5.39671C3.96304 6.19522 4.61036 6.84254 5.40887 6.84254ZM8.17883 7.91105H10.575V9.00877C10.575 9.00877 11.2253 7.70828 12.9945 7.70828C14.5727 7.70828 15.8801 8.48575 15.8801 10.8555V15.8528H13.397V11.4611C13.397 10.0631 12.6506 9.90937 12.0819 9.90937C10.9016 9.90937 10.6996 10.9274 10.6996 11.6434V15.8528H8.17883V7.91105ZM6.66924 7.91106H4.1485V15.8528H6.66924V7.91106Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  name="linkedin"
                  id="linkedin"
                  placeholder="@hithemes.io"
                  className="block w-full min-h-[44px] text-slate-500 placeholder-slate-500 pl-10 text-base tracking-sm border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  {...register('linkedin')}
                />
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-[180px,1fr] gap-8">
            <div>
              <h6 className="text-slate-700 mb-3 text-lg tracking-sm">Tags</h6>
              <p className="text-slate-500 text-sm tracking-sm">
                Adding tags (up to 5) allows people to search for and discover
                your publication.
              </p>
            </div>
            <div>
              <div className="relative mb-4 md:mb-6">
                <TagInput
                  placeholder="Tags"
                  disabled={_.size(tags) >= 5}
                  maxTags={5}
                  tags={tags}
                  setTags={setTags}
                />
              </div>
              <div>
                <p className="text-slate-600 mb-4 text-sm tracking-sm">
                  Recommended Tags
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  {_.map(user?.recommendedTopics, (topic) => (
                    <button
                      key={topic}
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-5 rounded-md tracking-sm text-slate-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      onClick={() => addTagFromRecommended(topic)}
                    >
                      <PlusIcon
                        className="mr-2 h-5 w-5 text-gray-700"
                        aria-hidden="true"
                      />
                      {topic}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pb-2 mb-8 border-b border-gray-200">
          <h2 className="text-slate-700 text-2xl font-medium tracking-md">
            People
          </h2>
        </div>
        <div className="grid md:grid-cols-[180px,1fr] gap-3 lg:gap-8 mb-8 md:mb-14">
          <div>
            <h6 className="text-slate-700 mb-3 text-lg tracking-sm">Editors</h6>
            <p className="text-slate-500 text-sm tracking-sm">
              Editors can add or remove stories. They can also review, edit and
              publish submissions.
            </p>
          </div>
          <div className="relative md:mb-6">
            <div className="hidden lg:block">
              <div>
                <div className="rounded-md shadow-sm">
                  <UserInput
                    name="editor"
                    placeholder="Editors"
                    users={editors}
                    setUsers={setEditors}
                    onChange={handleSearch}
                  />
                </div>
              </div>
              {foundUsers && !loading && inpEditor && (
                <PublicationSettingsSuggestions
                  name="Editors"
                  suggestions={foundUsers}
                  onClick={(e, userId, user) => handleAddUser(false, user)}
                />
              )}
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-[180px,1fr] gap-3 lg:gap-8">
          <h6 className="text-slate-700 text-lg tracking-sm">Writers</h6>
          <div>
            <div className="relative md:mb-6">
              <div className="hidden lg:block">
                <div>
                  <div className="rounded-md shadow-sm">
                    <UserInput
                      name="writer"
                      placeholder="Writers"
                      users={writers}
                      setUsers={setWriters}
                      onChange={handleSearch}
                    />
                  </div>
                </div>
                {foundUsers && !loading && inpWriter && (
                  <PublicationSettingsSuggestions
                    name="Writers"
                    suggestions={foundUsers}
                    onClick={(e, userId, user) => handleAddUser(true, user)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <hr className="my-8 lg:my-14 border-gray-200" />
        <div className="flex items-center justify-end gap-4">
          <button
            type="submit"
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
      </form>
    </div>
  );
}