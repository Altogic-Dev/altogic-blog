import HeadContent from '@/components/general/HeadContent';
import { useState, useEffect } from 'react';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { Tab } from '@headlessui/react';
import Layout from '@/layouts/Layout';
import { classNames } from '@/utils/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import PublicationSettingsInfo from './PublicationsSettingsInfo';
import PublicationsSettingsHome from './PublicationsSettingsHome';

export default function PublicationsSettings({ isCreate }) {
  const router = useRouter();
  const { isHome, publicationName } = router.query;
  const publication = useSelector(
    (state) => state.publication.selectedPublication
  );
  const isLoading = useSelector((state) => state.publication.publicationLoading);
  const sessionUser = useSelector((state) => state.auth.user);

  const [isInfo, setIsInfo] = useState(!isHome);
  const [doHomeSave, setDoHomeSave] = useState(false);
  const [doHomeClear, setDoHomeClear] = useState(false);
  const [doInfoSave, setDoInfoSave] = useState(false);
  const [doInfoClear, setDoInfoClear] = useState(false);

  const [isMountedHome, setIsMountedHome] = useState(false);
  const [isMountedInfo, setIsMountedInfo] = useState(false);
  const [layout, setLayout] = useState('title');
  const [isCentered, setIsCentered] = useState(false);
  const [textColor, setTextColor] = useState('#000');
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const [bottomColor, setBottomColor] = useState();

  const [bgColor, setBgColor] = useState();

  const [tags, setTags] = useState([]);
  const [inpEditor, setInpEditor] = useState('');
  const [editors, setEditors] = useState([]);
  const [inpWriter, setInpWriter] = useState('');
  const [writers, setWriters] = useState([]);
  const [user, setUser] = useState();
  const [isEditorSearch, setIsEditorSearch] = useState(false);
  const [avatarError, setAvatarError] = useState(null);
  const [logoError, setLogoError] = useState(null);

  const [fileUploading, setFileUploading] = useState([false, false, false]);

  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    description: yup
      .string()
      .max(280, 'Description should be max 280 characters')
      .required('Description is required'),
    tagline: yup
      .string()
      .max(100, 'Tagline should be max 100 characters')
      .required('Tagline is required'),
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Email is required'),
    twitter: yup.string().url('Please enter a valid url'),
    linkedin: yup.string().url('Please enter a valid url'),
    facebook: yup.string().url('Please enter a valid url'),
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const handleSave = () => {
    if (isInfo) setDoInfoSave(true);
    setDoHomeSave(true);
  };

  const handleClear = () => {
    if (isInfo) setDoInfoClear(true);
    setDoHomeClear(true);
  };

  const checkAuthorization = (publication, sessionUser) => {
    if (
      _.isNil(sessionUser) ||
      !['admin'].includes(sessionUser.role) ||
      _.lowerCase(publicationName) !==
        _.lowerCase(publication.name) ||
      _.isNil(publication)
    ) {
      router.push('/');
    }
  };

  useEffect(() => {
    if (!isCreate && publication && publicationName && user) {
      const sessionUser = _.find(
        publication.users,
        (person) => person.user === user?._id
      );
      checkAuthorization(publication, sessionUser);
    }
  }, [publication, publicationName, user]);

  useEffect(() => {
    if (sessionUser) {
      setUser(sessionUser);
    }
  }, [sessionUser]);

  return (
    <div>
      <HeadContent>
        <title>Opinate Publications Settings</title>
        <meta
          name="description"
          content="Opinate Publications Settings"
        />
      </HeadContent>
      <Layout loading={isLoading}>
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8 my-8 lg:my-[60px]">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between w-full">
              <h1 className="text-slate-700 text-3xl md:text-4xl xl:text-5xl font-bold tracking-md break-words">
                {isCreate
                  ? 'New Publication'
                  : `${_.get(publication, 'name')} settings`}
              </h1>
              <div className="hidden lg:flex items-center gap-4">
                <button
                  type="button"
                  className="flex items-center justify-center w-full md:w-auto px-[18px] py-2.5 text-md font-medium tracking-sm rounded-full text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  onClick={handleSave}
                >
                  {isCreate ? 'Create' : 'Save'}
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center w-full md:w-auto px-[18px] py-2.5 border border-gray-300 text-sm font-medium tracking-sm rounded-full text-slate-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  onClick={isCreate ? router.back : handleClear}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
        <Tab.Group defaultIndex={isInfo ? 0 : 1}>
          <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
            <Tab.List className="flex items-center gap-10 h-11 border-b border-gray-300">
              <Tab
                onClick={() => setIsInfo(true)}
                className={({ selected }) =>
                  classNames(
                    'inline-flex gap-2 h-full text-sm font-medium tracking-sm px-2 focus:outline-none',
                    selected
                      ? 'text-purple-700 relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-purple-700'
                      : 'text-slate-500'
                  )
                }
              >
                Info
              </Tab>
              {!isCreate && (
                <Tab
                  onClick={() => setIsInfo(false)}
                  className={({ selected }) =>
                    classNames(
                      'inline-flex gap-2 h-full text-sm font-medium tracking-sm px-2 focus:outline-none',
                      selected
                        ? 'text-purple-700 relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-purple-700'
                        : 'text-slate-500'
                    )
                  }
                >
                  Homepage
                </Tab>
              )}
            </Tab.List>
          </div>
          <Tab.Panels>
            <Tab.Panel>
              <PublicationSettingsInfo
                doSave={doInfoSave}
                setDoSave={setDoInfoSave}
                doClear={doInfoClear}
                setDoClear={setDoInfoClear}
                isCreate={isCreate}
                tags={tags}
                setTags={setTags}
                inpEditor={inpEditor}
                setInpEditor={setInpEditor}
                editors={editors}
                setEditors={setEditors}
                inpWriter={inpWriter}
                setInpWriter={setInpWriter}
                writers={writers}
                setWriters={setWriters}
                isEditorSearch={isEditorSearch}
                setIsEditorSearch={setIsEditorSearch}
                avatarError={avatarError}
                setAvatarError={setAvatarError}
                logoError={logoError}
                setLogoError={setLogoError}
                fileUploading={fileUploading}
                setFileUploading={setFileUploading}
                isMounted={isMountedInfo}
                setIsMounted={setIsMountedInfo}
                register={register}
                handleSubmit={handleSubmit}
                watch={watch}
                errors={errors}
                setValue={setValue}
                setError={setError}
                clearErrors={clearErrors}
                getValues={getValues}
                user={user}
              />
            </Tab.Panel>
            <Tab.Panel>
              <PublicationsSettingsHome
                layout={layout}
                setLayout={setLayout}
                isCentered={isCentered}
                setIsCentered={setIsCentered}
                textColor={textColor}
                setTextColor={setTextColor}
                selectedTabIndex={selectedTabIndex}
                setSelectedTabIndex={setSelectedTabIndex}
                doSave={doHomeSave}
                setDoSave={setDoHomeSave}
                doClear={doHomeClear}
                setDoClear={setDoHomeClear}
                isMounted={isMountedHome}
                setIsMounted={setIsMountedHome}
                bgColor={bgColor}
                setBgColor={setBgColor}
                bottomColor={bottomColor}
                setBottomColor={setBottomColor}
              />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </Layout>
    </div>
  );
}
