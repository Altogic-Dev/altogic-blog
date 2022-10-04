import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';
import Layout from '@/layouts/Layout';
import { classNames } from '@/utils/utils';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { publicationActions } from '@/redux/publication/publicationSlice';
import PublicationSettingsInfo from './PublicationsSettingsInfo';
import PublicationsSettingsHome from './PublicationsSettingsHome';

export default function PublicationsSettings() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [doHomeSave, setDoHomeSave] = useState(false);
  const [doHomeClear, setDoHomeClear] = useState(false);

  const { publicationName } = router.query;

  const handleSave = () => {
    setDoHomeSave(true);
  };

  const handleClear = () => {
    setDoHomeClear(true);
  };

  useEffect(() => {
    if (publicationName) {
      dispatch(
        publicationActions.getPublicationRequest(publicationName.toLowerCase())
      );
    }
  }, [publicationName]);

  return (
    <div>
      <Head>
        <title>Altogic Medium Blog App Publications Settings</title>
        <meta
          name="description"
          content="Altogic Medium Blog App Publications Settings"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8 my-8 lg:my-[60px]">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between w-full">
              <h1 className="text-slate-700 text-3xl md:text-4xl xl:text-5xl font-bold tracking-md">
                HiThemes settings
              </h1>
              <div className="hidden lg:flex items-center gap-4">
                <button
                  type="button"
                  className="flex items-center justify-center w-full md:w-auto px-[18px] py-2.5 text-md font-medium tracking-sm rounded-full text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center w-full md:w-auto px-[18px] py-2.5 border border-gray-300 text-sm font-medium tracking-sm rounded-full text-slate-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  onClick={handleClear}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
        <Tab.Group>
          <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
            <Tab.List className="flex items-center gap-10 h-11 border-b border-gray-300">
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
                Info
              </Tab>
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
                Homepage
              </Tab>
            </Tab.List>
          </div>
          <Tab.Panels>
            <Tab.Panel>
              <PublicationSettingsInfo />
            </Tab.Panel>
            <Tab.Panel>
              <PublicationsSettingsHome
                doSave={doHomeSave}
                setDoSave={setDoHomeSave}
                doClear={doHomeClear}
                setDoClear={setDoHomeClear}
              />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </Layout>
    </div>
  );
}
