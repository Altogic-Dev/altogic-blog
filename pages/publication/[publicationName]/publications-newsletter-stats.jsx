import Head from 'next/head';
import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
} from '@heroicons/react/solid';
import Layout from '@/layouts/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { publicationActions } from '@/redux/publication/publicationSlice';
import _ from 'lodash';
import { parseHtml } from '@/utils/utils';

const statistics = [
  {
    title:
      'Tincidunt rhoncus, sit dolor mollis feugiat. Nibh nulla tristique ante fermentum tellus aliqu...',
    description:
      'In tempus vestibulum nulla integer diam vitae, velit, interdum feugiat. Volutpat, mattis donec non...',
    send: '431',
    opened: '33',
    clicked: '33',
  },
  {
    title:
      'Amet, sapien enim morbi nibh. Sit morbi velit aliquam turpis viverra diam at. Tortor elit.',
    description:
      'Urna vestibulum in vel vitae dictum. Vel vivamus nunc malesuada egestas et egestas. Nam.',
    send: '431',
    opened: '33',
    clicked: '33',
  },
  {
    title:
      'Tincidunt rhoncus, sit dolor mollis feugiat. Nibh nulla tristique ante fermentum tellus aliqu...',
    description:
      'In tempus vestibulum nulla integer diam vitae, velit, interdum feugiat. Volutpat, mattis donec non...',
    send: '431',
    opened: '33',
    clicked: '33',
  },
  {
    title:
      'Amet, sapien enim morbi nibh. Sit morbi velit aliquam turpis viverra diam at. Tortor elit.',
    description:
      'Urna vestibulum in vel vitae dictum. Vel vivamus nunc malesuada egestas et egestas. Nam.',
    send: '431',
    opened: '33',
    clicked: '33',
  },
  {
    title:
      'Amet, sapien enim morbi nibh. Sit morbi velit aliquam turpis viverra diam at. Tortor elit.',
    description:
      'Urna vestibulum in vel vitae dictum. Vel vivamus nunc malesuada egestas et egestas. Nam.',
    send: '431',
    opened: '33',
    clicked: '33',
  },
];

export default function PublicationsNewsletterStats() {
  const dispatch = useDispatch();

  const newsletters = useSelector((state) => state.publication.getNewsletters);
  const publication = useSelector((state) => state.publication.publication);

  const getNewsletters = () => {
    dispatch(
      publicationActions.getNewslettersRequest({
        publication: _.get(publication, '_id'),
      })
    );
  };
  useEffect(() => {
    if (publication) {
      getNewsletters();
    }
  }, [publication]);

  return (
    <div>
      <Head>
        <title>Altogic Medium Blog App Publications Newsletter Stats</title>
        <meta
          name="description"
          content="Altogic Medium Blog App Publications Newsletter Stats"
        />
        
      </Head>
      <Layout>
        <div className="max-w-screen-xl mx-auto h-screen px-4 lg:px-8 pb-16">
          <h1 className="text-slate-700 mt-[60px] mb-16 text-3xl md:text-4xl xl:text-5xl font-bold tracking-md">
            HiThemes Biweekly Newsletter Stats
          </h1>
          <div className="max-w-5xl mx-auto">
            <div>
              {/* Desktop Statistics */}
              <div className="hidden lg:block mt-12 md:mt-20 border border-gray-200 rounded-lg overflow-hidden">
                <div>
                  <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                      <div className="overflow-hidden ring-1 ring-black ring-opacity-5">
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-xs font-medium text-slate-600 sm:pl-6"
                              >
                                Send Mails
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-center text-xs font-medium text-slate-600"
                              >
                                Send
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-center text-xs font-medium text-slate-600"
                              >
                                Opened
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-center text-xs font-medium text-slate-600"
                              >
                                Clicked
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            {newsletters?.map((statistic) => (
                              <tr key={statistic.title}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6">
                                  <p className="text-slate-800 text-base font-medium tracking-sm text-ellipsis">
                                    {parseHtml(statistic.content) ?? ''}
                                  </p>
                                  <p className="text-slate-500 text-sm tracking-sm">
                                    {statistic.description}
                                  </p>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-base font-semibold text-slate-600 tracking-sm">
                                  {statistic.sendCount}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-base font-semibold text-slate-600 tracking-sm">
                                  {statistic.openCount}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-base font-semibold text-slate-600 tracking-sm">
                                  %
                                  {statistic.sendCount === 0
                                    ? 0
                                    : (100 * statistic.openCount) /
                                      statistic.sendCount}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Mobile Statistics */}
              <div className="lg:hidden">
                <span className="text-slate-700 text-lg tracking-sm">
                  Send Mails
                </span>
                <ul className="divide-y divide-gray-200">
                  {statistics.map((statistic) => (
                    <li key={statistic.title} className="py-4">
                      <div className="p-4">
                        <p className="text-slate-800 text-base font-medium tracking-sm">
                          {statistic.title}
                        </p>
                        <p className="text-slate-500 text-sm tracking-sm">
                          {statistic.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <span className="inline-flex flex-col items-center text-slate-800 p-2 text-xs font-medium tracking-sm border border-gray-200 rounded-lg">
                          View
                          <span className="text-purple-700 text-lg font-semibold">
                            {statistic.send}
                          </span>
                        </span>
                        <span className="inline-flex flex-col items-center text-slate-800 p-2 text-xs font-medium tracking-sm border border-gray-200 rounded-lg">
                          opened
                          <span className="text-purple-700 text-lg font-semibold">
                            {statistic.opened}
                          </span>
                        </span>
                        <span className="inline-flex flex-col items-center text-slate-800 p-2 text-xs font-medium tracking-sm border border-gray-200 rounded-lg">
                          Read Ratio
                          <span className="text-purple-700 text-lg font-semibold">
                            {statistic.clicked}
                          </span>
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="py-5 px-3 border-t border-gray-200">
                  <nav className="flex items-center justify-between">
                    <div className="-mt-px w-0 flex-1 flex">
                      <a
                        href="#"
                        className="inline-flex items-center text-slate-700 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      >
                        <ArrowNarrowLeftIcon
                          className="h-5 w-5 text-slate-700"
                          aria-hidden="true"
                        />
                      </a>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href="#"
                        className="inline-flex items-center justify-center w-6 h-6 text-slate-800 p-1 text-sm font-medium tracking-sm rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      >
                        1
                      </a>
                      <a
                        href="#"
                        className="inline-flex items-center justify-center w-6 h-6 text-slate-500 p-1 text-sm font-medium tracking-sm rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      >
                        3
                      </a>
                      <a
                        href="#"
                        className="inline-flex items-center justify-center w-6 h-6 text-slate-500 p-1 text-sm font-medium tracking-sm rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      >
                        ...
                      </a>
                      <a
                        href="#"
                        className="inline-flex items-center justify-center w-6 h-6 text-slate-500 p-1 text-sm font-medium tracking-sm rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      >
                        8
                      </a>
                      <a
                        href="#"
                        className="inline-flex items-center justify-center w-6 h-6 text-slate-500 p-1 text-sm font-medium tracking-sm rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      >
                        10
                      </a>
                    </div>
                    <div className="-mt-px w-0 flex-1 flex justify-end">
                      <a
                        href="#"
                        className="inline-flex items-center text-slate-700 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      >
                        <ArrowNarrowRightIcon
                          className="h-5 w-5 text-slate-700"
                          aria-hidden="true"
                        />
                      </a>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
